#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2];

if (!projectName) {
  console.error("Please provide a project name:");
  console.error("  npx create-my-node-backend my-app");
  console.error("  npx create-my-node-backend .");
  process.exit(1);
}

const useCurrentDir = projectName === ".";

const targetPath = useCurrentDir
  ? process.cwd()
  : path.isAbsolute(projectName)
    ? projectName
    : path.join(process.cwd(), projectName);

// Tracks whether we created the directory, so failures can clean it up.
let createdDir = false;

const fail = (message, cleanup = false) => {
  console.error(`\n❌ ${message}`);
  if (cleanup && createdDir) {
    try {
      fs.rmSync(targetPath, { recursive: true, force: true });
      console.error(`Rolled back: removed incomplete directory "${targetPath}"`);
    } catch {
      console.error(`Could not remove incomplete directory "${targetPath}" — please delete it manually.`);
    }
  }
  process.exit(1);
};

try {
  // 1. Create directory only if not using current directory
  if (!useCurrentDir) {
    if (fs.existsSync(targetPath)) {
      fail(`Directory "${projectName}" already exists. Choose another name or remove it.`);
    }
    fs.mkdirSync(targetPath, { recursive: true });
    createdDir = true;
  } else if (fs.readdirSync(process.cwd()).length > 0) {
    fail("Current directory is not empty. Run in an empty directory or pass a project name.");
  }

  // 2. Copy boilerplate
  const boilerplatePath = path.join(__dirname, "boilerplate");
  if (!fs.existsSync(boilerplatePath)) {
    fail(`Boilerplate template not found at "${boilerplatePath}". Your installation may be corrupted — try reinstalling the package.`, true);
  }
  fs.cpSync(boilerplatePath, targetPath, {
    recursive: true,
    // Never copy local install artifacts into the new project.
    // (node_modules exists in the repo when developing the CLI itself.)
    // NOTE: compare paths *relative* to boilerplatePath — the absolute
    // install path itself contains ".../node_modules/<pkg>/..." when
    // installed via npm/npx, so matching on the absolute path would
    // exclude everything.
    filter: (src) => {
      const rel = path.relative(boilerplatePath, src);
      // Keep the boilerplate root itself.
      if (!rel) return true;
      const parts = rel.split(path.sep);
      if (parts.includes("node_modules")) return false;
      if (parts.includes("logs")) return false;
      return true;
    },
  });

  // 3. Update package.json
  const pkgPath = path.join(targetPath, "package.json");
  if (!fs.existsSync(pkgPath)) {
    fail(`package.json not found in the copied template ("${pkgPath}").`, true);
  }
  let pkg;
  try {
    pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  } catch {
    fail(`Could not parse package.json in the copied template ("${pkgPath}").`, true);
  }

  pkg.name = path.basename(useCurrentDir ? process.cwd() : targetPath);
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  // 4. Install deps
  console.log("Installing dependencies...");
  try {
    execSync("npm install", { stdio: "inherit", cwd: targetPath });
  } catch {
    fail(`"npm install" failed inside "${targetPath}". The project files are in place — run "npm install" there manually.`);
  }

  console.log("\n✅ Project created successfully!");

  if (!useCurrentDir) {
    console.log(`\nNext steps:\n  cd ${projectName}\n  npm run start`);
  } else {
    console.log("\nNext steps:\n  npm run start");
  }
} catch (err) {
  fail(`Unexpected error while creating the project: ${err.message}`, true);
}
