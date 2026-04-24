#!/usr/bin/env node
/* eslint-env node */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read app config
let appConfig;
try {
  const appConfigPath = path.resolve(__dirname, 'app.json');
  const appConfigContent = fs.readFileSync(appConfigPath, 'utf8');
  appConfig = JSON.parse(appConfigContent);
} catch (error) {
  console.log('⚠️  Could not read app.json');
  process.exit(1);
}

const org = appConfig.deployment?.org || 'cog-atlas';
const project = appConfig.deployment?.project || 'atlas-greenfield';

// Extract cluster from baseUrl (e.g., https://greenfield.cognitedata.com -> greenfield)
const baseUrl = appConfig.deployment?.baseUrl || 'https://api.cognitedata.com';
const clusterMatch = baseUrl.match(/https:\/\/([^.]+)\.cognitedata\.com/);
const cluster = clusterMatch ? clusterMatch[1] : 'api';

// Start vite dev server on port 1988 (must match Fusion development URL)
const vite = spawn('npx', ['vite', '--port', '1988'], { 
  stdio: ['inherit', 'pipe', 'inherit'],
  shell: true,
  env: {
    ...process.env,
    VITE_FUSION_MODE: 'true'
  }
});

let urlShown = false;

vite.stdout.on('data', (data) => {
  const output = data.toString();
  
  // Look for the port in Vite's output (HTTPS enabled via vite.config.ts)
  const portMatch = output.match(/Local:\s+https:\/\/localhost:(\d+)/);
  if (portMatch && !urlShown) {
    urlShown = true;
    const port = portMatch[1];
    
    const fusionUrl = `https://${org}.fusion.cognite.com/${project}/streamlit-apps/dune/development/${port}?cluster=${cluster}.cognitedata.com&workspace=industrial-tools`;
    
    console.log('\n🚀 Development server started!');
    console.log(`📱 Local URL: https://localhost:${port}`);
    console.log(`🌐 Fusion URL: ${fusionUrl}`);
    console.log('');
  }
  
  // Pass through the original output
  process.stdout.write(output);
});

vite.on('close', (code) => {
  process.exit(code);
});

