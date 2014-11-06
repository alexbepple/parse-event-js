var future = require('date_parser2').future;
var moment = require('moment');

describe('New date parser: #future', function() {
    it('technically creates a Moment.js moment', function() {
        expect(moment.isMoment(future('1 jan'))).to.be.truthy();
    });

    it('creates date from D MMM (day of month and short month)', function() {
        var jan1 = future('1 Jan');
        expect(jan1.date()).to.equal(1);
        expect(jan1.month()).to.equal(0);
    });
    it('accepts MMM given in lowercase', function() {
        expect(future('1 jan')).to.be.date(future('1 Jan'));
    });
    it('invalidates date when there is superfluous input', function() {
        expect(future('1 jan foo')).not.to.be.valid();
    });

    describe('creates date from day of week', function() {
        it('when day given in capital case', function() {
            expect(future('Monday').day()).to.equal(1);
        });
        it('when day given in lowercase', function() {
            expect(future('monday').day()).to.equal(1);
        });
        it('when day is abbreviated', function() {
            expect(future('mon').day()).to.equal(1);
        });
        it('at start of day', function() {
            expect(future('Monday')).to.be.date(future('Monday').startOf('day'));
        });
        it('only future date', function() {
            var sunday = moment('3000-01-01').day(0);
            expect(future('Monday', sunday.clone())).to.be.after(sunday);
        });
    });
    
    it('creates date from time', function() {
        expect(future('01:00').hour()).to.equal(1);
    });
});
