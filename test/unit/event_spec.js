require('sugar');
var Event = require('event');

describe('Event', function() {
    it('remembers the properties it was constructed with', function() {
        var start = Date.create();
        console.log(Event({start: start}));
        Event({start: start}).start.must.be(start);
    });
});
describe('Event with start date and duration', function() {
    var event = Event({
        start: Date.create('2014-01-01 01:01'),
        durationInSeconds: 60
    });
    it('knows when it ends', function() {
        event.end.is('2014-01-01 01:02').must.be.true();
    });
    it('preserves its start date', function() {
        event.start.is('2014-01-01 01:01').must.be.true();
    });
});
