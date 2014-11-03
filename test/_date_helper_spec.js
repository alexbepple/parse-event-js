var m = require('./_date_helper');

describe('Date helper', function() {
	it('creates invalid dates', function() {
		expect(m.invalidDate()).not.to.be.valid();
	});
    it('creates tomorrow at start of day', function() {
        expect(m.tomorrow()).to.be.date(m.tomorrow().startOf('day'));
    });
});
