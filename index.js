#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectName = process.argv[2];

if (!projectName) {
  console.error("Please provide a project name:");
  console.error("  npx create-my-backend my-app");
  process.exit(1);
}

const targetPath = path.join(process.cwd(), projectName);

// 1. Copy boilerplate
const boilerplatePath = path.join(__dirname, "boilerplate");
fs.mkdirSync(targetPath);
fs.cpSync(boilerplatePath, targetPath, { recursive: true });

// 2. Update package.json
const pkgPath = path.join(targetPath, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.name = projectName;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

// 3. Install deps
console.log("Installing dependencies...");
execSync("npm install", { stdio: "inherit", cwd: targetPath });

console.log(`\n✅ Project ${projectName} created successfully!`);
console.log(`\nNext steps:\n  cd ${projectName}\n  npm run start`);
