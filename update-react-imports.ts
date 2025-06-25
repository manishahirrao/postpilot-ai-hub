import { promises as fs } from 'fs';
import path from 'path';

async function updateReactImports() {
  const srcDir = path.join(__dirname, 'src');
  
  // Get all TypeScript/TSX files
  const files = await getAllFiles(srcDir, ['.tsx', '.ts']);
  
  for (const file of files) {
    try {
      let content = await fs.readFile(file, 'utf-8');
      
      // Check if the file imports React with named imports
      const reactImportRegex = /^import\s+React\s*,\s*\{([^}]+)\}\s+from\s+['"]react['"]/m;
      const match = content.match(reactImportRegex);
      
      if (match) {
        const [, namedImports] = match;
        const newImport = `import * as React from 'react';\nimport {${namedImports}} from 'react';`;
        content = content.replace(reactImportRegex, newImport);
        await fs.writeFile(file, content, 'utf-8');
        console.log(`Updated: ${file}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
}

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function getAllFiles(dir: string, extensions: string[]): Promise<string[]> {
  const files: string[] = [];
  for await (const file of walk(dir)) {
    if (extensions.some(ext => file.endsWith(ext))) {
      files.push(file);
    }
  }
  return files;
}

updateReactImports().catch(console.error);
