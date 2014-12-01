require! {
    event_parser: {parseEvent}
}

describe 'Event parser', ->
    specify 'translates duration to seconds', ->
        expect parseEvent('1h').durationInSeconds .to.equal 3600

