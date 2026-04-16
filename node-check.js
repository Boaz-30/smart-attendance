#!/usr/bin/env node

/**
 * Node Version Check Script
 * 
 * Verifies that the installed Node.js version meets project requirements.
 * This script is optional but helpful for catching version mismatches early.
 * 
 * Usage:
 *   node node-check.js
 *   
 * Can be added to npm scripts:
 *   "preinstall": "node node-check.js"
 */

const semver = require('semver');

// Define minimum Node version requirement
// Project uses features like import.meta.dirname which require Node 20+
const REQUIRED_VERSION = '20.0.0';
const RECOMMENDED_VERSION = '22.0.0';

// Get current Node version
const currentVersion = process.version;
const versionNumber = currentVersion.slice(1); // Remove 'v' prefix

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function separator() {
  console.log('─'.repeat(60));
}

// Main check
log('\n📋 Node.js Version Check', 'cyan');
separator();

log(`Current version:      ${colors.bold}${currentVersion}${colors.reset}`);
log(`Required version:     ${colors.bold}${REQUIRED_VERSION}${colors.reset} or higher`);
log(`Recommended version:  ${colors.bold}${RECOMMENDED_VERSION}${colors.reset} or higher`);

separator();

// Check if version meets minimum requirement
const meetsMinimum = semver.gte(versionNumber, REQUIRED_VERSION);

if (!meetsMinimum) {
  log('\n❌ ERROR: Node.js version is too old!', 'red');
  log(`\nYour version (${currentVersion}) does not meet the minimum requirement (${REQUIRED_VERSION}).`, 'red');
  log('\nWhy? This project uses modern JavaScript features that require Node.js 20 or higher:', 'yellow');
  log('  • import.meta.dirname');
  log('  • Promise.all improvements');
  log('  • Other ES2024+ features', 'yellow');
  
  log('\n📥 How to upgrade Node.js:', 'yellow');
  log('  macOS (Homebrew):    brew install node', 'yellow');
  log('  Windows:             Download from https://nodejs.org/', 'yellow');
  log('  Linux:               sudo apt update && sudo apt install nodejs', 'yellow');
  log('  nvm (Recommended):   nvm install 22 && nvm use 22', 'yellow');
  
  separator();
  process.exit(1);
}

// Check if using recommended version
const meetsRecommended = semver.gte(versionNumber, RECOMMENDED_VERSION);

if (meetsRecommended) {
  log('✅ Node.js version is perfect!', 'green');
  log(`Using Node.js ${versionNumber} (${meetsRecommended ? 'recommended' : 'minimum required'})`, 'green');
} else {
  log('⚠️  Node.js version works but could be updated', 'yellow');
  log(`Using Node.js ${versionNumber} (meets minimum, but ${RECOMMENDED_VERSION} recommended)`, 'yellow');
  log('\nOptional: Upgrade to Node.js 22.x for better performance and latest features', 'yellow');
  log('  → nvm install 22 && nvm use 22', 'yellow');
  log('  → Or download from https://nodejs.org/', 'yellow');
}

// Check npm version
log('\nnpm version check:', 'cyan');
const npmVersion = require('npm/package.json').version || 'unknown';
log(`npm version: ${colors.bold}${npmVersion}${colors.reset}`);

separator();
log('✅ Ready to proceed with installation and development!', 'green');
console.log('');
