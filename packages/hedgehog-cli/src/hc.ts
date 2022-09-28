#!/usr/bin/env node
import {executeOutput, transpile} from '@hedgehogcomputing/core';

const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const hhsFilePath = argv.f;
const hhsUserAndScript = argv._;
const hhOutputItems = argv.o;

if (typeof hhsFilePath === 'string') {
  console.log(hhsFilePath)
}

if (typeof hhsUserAndScript === 'string') {
  console.log(hhsUserAndScript)
}

if (typeof hhOutputItems === 'string') {
  console.log(hhOutputItems)
}

