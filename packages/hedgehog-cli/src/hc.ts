#!/usr/bin/env node
const core = require('@hedgehogcomputing/core');

const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const hhsFilePath = argv.f;
const hhsScriptPath = argv._;
const hhSaveOutputItemFile = argv.o;

let executeFile = typeof hhsFilePath === 'string';
let executeScript = typeof hhsScriptPath === 'string';
let saveOutputItemToFile = typeof hhSaveOutputItemFile === 'string';

if (executeFile && executeScript) {
  console.log('Cannot execute a local hedgehog script file and a remote script at the same time');
  process.exit(1);
}

if (executeFile) {
  ( async () => {
    const fs = require('fs');
    const hhsSourceCodeText = fs.readFileSync(hhsFilePath, 'utf8');
    const transpiledSourceCode = await core.transpile(hhsSourceCodeText);
    const outputItems = core.executeOutput(transpiledSourceCode);
    if (saveOutputItemToFile) {
      fs.writeFileSync(hhSaveOutputItemFile, JSON.stringify(outputItems));
    }
  })();
}

if (executeScript) {
  ( async () => {
    const transpiledSourceCode = await core.transpile('*import  ' + hhsScriptPath);
    const outputItems =  core.executeOutput(transpiledSourceCode);
    if (saveOutputItemToFile) {
      const fs = require('fs');
      fs.writeFileSync(hhSaveOutputItemFile, JSON.stringify(outputItems));
    }

  })();
}

export {};