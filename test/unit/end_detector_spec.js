var m = require('../_date_helper');
var moment = require('moment');
var sinon = require('sinon');
var end = require('end_detector');

describe('End detector', function() {
	it('returns date from date detector using input minus 1st token', function() {
		var dateFromDateDetector = moment().toDate();
		var dateDetectorStub = sinon.stub();
		dateDetectorStub.withArgs('bar').returns({date: dateFromDateDetector});
		dateDetectorStub.returns({date: "'wrong input for date detector'"});
		var detectEnd = end.detector(dateDetectorStub);

		detectEnd('foo bar').date.should.equal(dateFromDateDetector);
	});
	it('uses tail of date detector when it finds a date', function() {
		var resultWithValidDate = {
			date: moment().toDate(),
			tail: 'tail from date detector'
		};
		detectEnd = end.detector(function() {return resultWithValidDate;});
		detectEnd('input').tail.should.equal('tail from date detector');
	});
	it('returns the input as the tail when it cannot find a date', function() {
		var dateDetectorResultWithInvalidDate = {
			date: m.invalidDate(),
			tail: 'tail from date detector'
		};
		var detectEnd = end.detector(function(input) {
			return dateDetectorResultWithInvalidDate;
		});

		detectEnd('input').tail.should.equal('input');
	});
});
