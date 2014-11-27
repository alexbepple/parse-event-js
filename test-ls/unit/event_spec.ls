moment = require('moment')
h = require('../_date_helper')
Event = require('event')

describe 'Event', ->
    startMoment = moment()
    start = startMoment.toDate()
    startClone = startMoment.clone().toDate()
    specify 'remembers its start', ->
        Event({start: start}).should.start(startClone)

    specify 'disregards an invalid end', ->
        Event({start: start, end: moment.invalid().toDate()}).should.end(startClone)


describe 'Event with start date and duration', ->
    event = Event {
        start: moment('2014-01-01 01:01').toDate(),
        durationInSeconds: 60
    }

    specify 'knows when it ends', ->
        event.should.end('2014-01-01 01:02')

    specify 'preserves its start date', ->
        event.should.start('2014-01-01 01:01')

