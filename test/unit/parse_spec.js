var q = require('parse');

describe('Date parser', function() {
    describe('expands abbreviations', function() {
        it('today', function() {
            expect(q.expandAbbreviations('tod')).to.contain('today');
        });
        it('tomorrow', function() {
            expect(q.expandAbbreviations('tom')).to.contain('tomorrow');
        });
        it('for weekdays', function() {
            expect(q.expandAbbreviations('sun')).to.contain('sunday');
        });
    });

    it('only creates future dates', function() {
        var dayOfWeek = Date.create().format('{dow}');
        expect(q.createDate(dayOfWeek)).to.be.future;
    });

    describe('supplements missing month', function() {
        var reference;
        beforeEach(function() {
            reference = Date.create('2 Jan');
        });
        it('using current month', function() {
            expect(q.addMonthIfNecessary('3', reference)).to.equal('3 Jan');
        });
        it('using next month if necessary', function() {
            expect(q.guessMonth('1', reference)).to.equal('Feb');
        });
        it('only if a day is given at all', function () {
            expect(q.containsDay('0:00')).to.be.false;
            expect(q.addMonthIfNecessary('0:00')).to.equal('0:00');
        });
        it('using next month for today', function() {
            expect(q.guessMonth('2', reference)).to.equal('Feb');
        });
    });

    describe('requires month to be given as three-letter abbreviation', function() {
        it('that can be lowercase', function() {
            expect(q.containsMonth('feb')).to.be.true;
        });
        it('that can be uppercase', function() {
            expect(q.containsMonth('Feb')).to.be.true;
        });
        it('not as a number', function() {
            expect(q.containsMonth('3')).to.be.false;
        });
    });

    describe('accepts times as groups of digits without separator', function() {
        it('like 0100', function() {
            expect(q.disambiguateTimes('0100')).to.contain('01:00');
        });
        it('like 100', function() {
            expect(q.disambiguateTimes('100')).to.contain('1:00');
        });
    });

    it('assumes an all-day event when no time is given', function() {
        expect(q.parse('foo')).to.be.allDay;
    });
});
