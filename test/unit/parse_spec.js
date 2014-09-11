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
        var dateParsedFromDayOfWeek = q.parse(dayOfWeek).start;
        expect(dateParsedFromDayOfWeek).to.be.future;
    });
    it('avoids edge cases of Sugar’s date parsing', function() {
        var edgeCase = q.parse('1 Novotel');
        expect(edgeCase.start).to.be.future;
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

    describe('requires month to be given as three letters', function() {
        it('that can be lowercase', function() {
            expect('feb').to.containMonth();
        });
        it('that can be uppercase', function() {
            expect('Feb').to.containMonth();
        });
        it('that stand alone', function() {
            expect('Novotel').not.to.containMonth();
            expect('Safonov').not.to.containMonth();
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

    it('translates duration to seconds', function() {
        expect(q.parse('1h').durationInSeconds).to.equal(3600);
    });
});
