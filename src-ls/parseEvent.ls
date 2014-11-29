#!/usr/bin/env lsc

parse = require('./parse').parse
format = require('./format').formatForAddEvent
console.log(format(parse(process.argv[2])))

