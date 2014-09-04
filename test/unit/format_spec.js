var format = require('format').formatForAddEvent;

describe('Date formatter', function() {
    it('formats title', function() {
        format({'title': 'foo'}).must.include("-title 'foo'");
    });
    it('formats start', function() {
        format({
            'start': Date.create('2014-01-01 01:01')
        }).must.include("-start '2014-01-01 01:01'");
    });
});
