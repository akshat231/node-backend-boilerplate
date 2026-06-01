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
  : path.join(process.cwd(), projectName);

// 1. Create directory only if not using current directory
if (!useCurrentDir) {
  fs.mkdirSync(targetPath);
}

// 2. Copy boilerplate
const boilerplatePath = path.join(__dirname, "boilerplate");
fs.cpSync(boilerplatePath, targetPath, { recursive: true });

// 3. Update package.json
const pkgPath = path.join(targetPath, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

if (useCurrentDir) {
  pkg.name = path.basename(process.cwd());
} else {
  pkg.name = projectName;
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

// 4. Install deps
console.log("Installing dependencies...");
execSync("npm install", { stdio: "inherit", cwd: targetPath });

console.log("\n✅ Project created successfully!");

if (!useCurrentDir) {
  console.log(`\nNext steps:\n  cd ${projectName}\n  npm run start`);
} else {
  console.log("\nNext steps:\n  npm run start");
}