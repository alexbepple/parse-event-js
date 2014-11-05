var moment = require('moment');
var formatDate = require('./_date_assertions').formatDate;

describe('Date assertions', function() {
    it('format dates in an easily readable fashion', function() {
        var formatted = formatDate(moment('2014-11-05 13:00').toDate());
        expect(formatted).to.equal('2014-11-05 13:00');
    });
    it("format 'undefined' as such", function() {
        expect(formatDate(undefined)).to.beUndefined();
    });
});
