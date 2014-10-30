var _ = require('lodash');
var endDetector = require('end_detector');

describe('End detector', function() {
	it('returns date from date detector using input minus 1st token', function() {
		// rewrite test so that error messages are understandable!!!
		var dateFromDateDetector = Date.create();
		var stubDetectDate = function(input) {
			if (input === 'bar') return {date: dateFromDateDetector};
			return {date: Date.create('invalid'), tail: 'invalid result'};
		};
		var detectEnd = endDetector.detector(stubDetectDate);

		detectEnd('foo bar').date.should.equal(dateFromDateDetector);
	});
	it('uses tail of date detector when it finds a date', function() {
		var resultWithValidDate = {date: Date.create(), tail: 'tail from date detector'};
		detectEnd = endDetector.detector(function() {
			return resultWithValidDate;
		});
		detectEnd('input').tail.should.equal('tail from date detector');
	});
	it('returns the input as the tail when it cannot find a date', function() {
		var dateDetectorResultWithInvalidDate = {
			date: Date.create('invalid'),
			tail: 'tail from date detector'
		};
		var detectEnd = endDetector.detector(function(input) {
			return dateDetectorResultWithInvalidDate;
		});

		detectEnd('input').tail.should.equal('input');
	});
});
