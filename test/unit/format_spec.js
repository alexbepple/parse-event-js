var moment = require('moment');
var format = require('format').formatForAddEvent;

describe('Date formatter', function() {
    it('formats title', function() {
        format({'title': 'foo'}).should.include("-title 'foo'");
    });
    it('formats start', function() {
        format({
            'start': moment('2014-01-01 01:01').toDate()
        }).should.include("-start '2014-01-01 01:01'");
    });
});
