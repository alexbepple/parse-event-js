var moment = require('moment');
var h = require('./_helper');
var Event = require('event');

describe('Event', function() {
    var startMoment = moment(), start = startMoment.toDate(), startClone = startMoment.clone().toDate();
    it('remembers its start', function() {
        Event({start: start}).should.start(startClone);
    });
    it('disregards an invalid end', function() {
        Event({start: start, end: h.invalidDate()}).should.end(startClone);
    });
});

describe('Event with start date and duration', function() {
    var event = Event({
        start: moment('2014-01-01 01:01').toDate(),
        durationInSeconds: 60
    });
    it('knows when it ends', function() {
        event.should.end('2014-01-01 01:02');
    });
    it('preserves its start date', function() {
        event.should.start('2014-01-01 01:01');
    });
});
