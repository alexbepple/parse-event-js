require! {
    event_parser: {parseEvent}
}

describe 'Event parser', ->
    specify 'assumes an all-day event when no time is given', ->
        expect parseEvent('foo') .to.be.allDay()

    specify 'does not assume an all-day when time given in short form', ->
        expect parseEvent('100') .not.to.be.allDay()

    specify 'translates duration to seconds', ->
        expect parseEvent('1h').durationInSeconds .to.equal 3600

