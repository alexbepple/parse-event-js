require('sugar');
var h = require('./_helper');
var Event = require('event');

describe('Event', function() {
    var start = Date.create();
    it('remembers its start', function() {
        Event({start: start}).should.start(start);
    });
    it('disregards an invalid end', function() {
        Event({start: start, end: h.invalidDate()}).should.end(start);
    });
});

describe('Event with start date and duration', function() {
    var event = Event({
        start: Date.create('2014-01-01 01:01'),
        durationInSeconds: 60
    });
    it('knows when it ends', function() {
        event.should.end('2014-01-01 01:02');
    });
    it('preserves its start date', function() {
        event.should.start('2014-01-01 01:01');
    });
});
