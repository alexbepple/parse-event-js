var moment = require('moment');
var tomorrow = require('../_date_helper').tomorrow;
var x = require('date_detector');
var sinon = require('sinon');

describe('Date detector', function() {
	it('saves detected date and unprocessed tail', function() {
		expect(x.detect('tomorrow foo')).to.eql({
            date: tomorrow().toDate(),
            tail: 'foo'
        });
	});
});
