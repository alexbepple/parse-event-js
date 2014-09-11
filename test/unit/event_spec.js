require('sugar');
var Event = require('event');

describe('Event', function() {
    it('remembers the properties it was constructed with', function() {
        var start = Date.create();
        expect(Event({start: start}).start).to.equal(start);
    });
});
describe('Event with start date and duration', function() {
    var event = Event({
        start: Date.create('2014-01-01 01:01'),
        durationInSeconds: 60
    });
    it('knows when it ends', function() {
        expect(event.end.is('2014-01-01 01:02')).to.be.true;
    });
    it('preserves its start date', function() {
        expect(event.start.is('2014-01-01 01:01')).to.be.true;
    });
});
