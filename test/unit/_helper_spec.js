var m = require('./_helper');

describe('Test helper', function() {
	it('creates invalid dates', function() {
		expect(m.invalidDate()).not.to.be.valid();
	});
});
