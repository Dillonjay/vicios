#!/usr/bin/env node

/**
 * Fix imports script
 *
 * A utility to help fix import paths after file reorganization.
 *
 * Usage:
 * node scripts/fix-imports.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT_DIR, "src");

// Configuration - add your mappings here
const PATH_MAPPINGS = {
  // Old import path -> new import path
  "./types.ts": "../types",
  "./components/": "../components/",
  "./constants": "../config/constants",
  "./connectMessages": "../config/connectMessages",
  "./aboutMessages": "../config/aboutMessages",
  "./projectMessages": "../config/projectMessages",
  "../../MusicButton": "../MusicButton",
  "../../constants": "../../config/constants",
  "./locales/": "../config/locales/",
  "./MusicButton": "../components/MusicButton",
};

// Filetypes to process
const FILE_EXTENSIONS = [".ts", ".tsx"];

// Skip directories
const SKIP_DIRS = ["node_modules", "dist", ".git"];

/**
 * Process a file and fix imports
 */
function processFile(filePath) {
  try {
    // Read file content
    let content = fs.readFileSync(filePath, "utf8");
    let hasChanges = false;

    // Apply each mapping
    for (const [oldPath, newPath] of Object.entries(PATH_MAPPINGS)) {
      const importRegex = new RegExp(
        `import\\s+(.+?)\\s+from\\s+(['"])${oldPath}`,
        "g"
      );
      const replacedContent = content.replace(
        importRegex,
        (match, importNames, quote) => {
          hasChanges = true;
          return `import ${importNames} from ${quote}${newPath}`;
        }
      );

      if (content !== replacedContent) {
        content = replacedContent;
      }
    }

    // Save changes if any
    if (hasChanges) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`✅ Fixed imports in: ${filePath}`);
    }
  } catch (err) {
    console.error(`❌ Error processing file ${filePath}:`, err);
  }
}

/**
 * Walk directory recursively
 */
function walkDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (SKIP_DIRS.includes(file)) continue;

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (FILE_EXTENSIONS.includes(path.extname(filePath))) {
      processFile(filePath);
    }
  }
}

// Main execution
console.log("🔍 Scanning for import paths to fix...");
walkDir(SRC_DIR);
console.log("✅ Done fixing imports!");
