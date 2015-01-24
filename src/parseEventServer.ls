#!/usr/bin/env lsc

require! {
    './event_parser': {parseEvent}
    './format': {formatForAddEvent}
    'net'
}

server = net.createServer allowHalfOpen:true, (socket) ->
    data = ''
    socket.on 'data', (chunk) ->
        data += chunk
    socket.on 'end', ->
        data |> parseEvent |> formatForAddEvent |> socket.write
        socket.end()
server.listen 1337
