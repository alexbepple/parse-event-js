var q = require('parse');

describe('Event parser', function() {
    it('assumes an all-day event when no time is given', function() {
        expect(q.parse('foo')).to.be.allDay();
    });

	it('does not assume an all-day when time given in short form', function() {
		q.parse('100').should.not.to.be.allDay();
	});

    it('translates duration to seconds', function() {
        expect(q.parse('1h').durationInSeconds).to.equal(3600);
    });
});
