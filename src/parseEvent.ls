#!/usr/bin/env lsc

parseEvent = require('./event_parser').parse
format = require('./format').formatForAddEvent
console.log format parseEvent process.argv[2]

