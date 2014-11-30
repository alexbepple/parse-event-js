#!/usr/bin/env lsc

require! {
    './event_parser': {parseEvent}
    './format': {formatForAddEvent}
}

process.argv[2] |> parseEvent |> formatForAddEvent |> console.log
