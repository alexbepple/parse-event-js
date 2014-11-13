var moment = require('moment');
var tomorrow = require('../_date_helper').tomorrow;
var x = require('date_detector');
var sinon = require('sinon');

describe('Date detector', function() {
	it('saves detected date and unprocessed tail', function() {
        var wrongDate = moment('2000-01-01');
        var rightDate = moment('2010-01-01');

        var futureStub = sinon.stub();
        futureStub.withArgs('date').returns(wrongDate);
        futureStub.withArgs('date spec').returns(rightDate);
        futureStub.returns(moment.invalid());
        var dateParserStub = {future: futureStub};

        var dateMatch = x.detector(dateParserStub, 'date spec foo');
		expect(dateMatch.date).to.be.date(rightDate);
        expect(dateMatch.tail).to.equal('foo');
	});
});
