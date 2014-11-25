#!/usr/bin/env node

var parse = require('./parse').parse;
var format = require('./format').formatForAddEvent;
console.log(format(parse(process.argv[2])));

