#!/usr/bin/env node
import {executeOutput, transpile} from '@hedgehogcomputing/core';
import { boolean } from 'yargs';

const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const hhsFilePath = argv.f;
const hhsScriptPath = argv._;
const hhOutputItems = argv.o;

let executeFile = false;
let executeScript = false;
if (typeof hhsFilePath === 'string') {
  console.log(hhsFilePath)
}

if (typeof hhsScriptPath === 'string') {
  console.log(hhsScriptPath)
}

if (typeof hhOutputItems === 'string') {
  console.log(hhOutputItems)
}

