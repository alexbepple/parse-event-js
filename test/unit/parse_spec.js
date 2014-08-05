var expect = require('chai').expect;
var q = require('parse');

describe('QuickCalifier', function() {
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
});
