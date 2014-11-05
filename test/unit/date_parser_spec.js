var moment = require('moment');
var date = require('date_parser');
var future = date.future;

describe('Date parser', function() {
    it('only creates future dates', function() {
		var todayAsDayOfWeek = moment().format('ddd');
        expect(future(todayAsDayOfWeek)).to.be.future();
    });
    it('avoids edge cases of Sugar’s date parsing', function() {
        var edgeCase = future('1 Novotel');
        expect(edgeCase).not.to.be.valid();
    });

    describe('expands abbreviations', function() {
        it('tomorrow', function() {
			expect(future('tom')).to.eql(future('tomorrow'));
        });
        it('for weekdays', function() {
            expect(future('sun')).to.eql(future('sunday'));
        });
    });

    describe('detects times as groups of digits without separator', function() {
        it('like 0100', function() {
            expect(future('0100')).to.eql(future('01:00'));
        });
        it('like 100', function() {
            expect(future('100')).to.eql(future('1:00'));
        });
    });

    describe('supplements missing month', function() {
        var reference;
        beforeEach(function() {
            reference = moment().month('jan').date(2).toDate();
        });
		it('if none is given', function() {
			var now = moment();
			var todayAsDayOfMonth = now.format('D');
			var oneMonthLater = now.clone().add(1, 'month').format('D MMM');
			expect(future(todayAsDayOfMonth)).to.eql(future(oneMonthLater));
		});
        it('using current month', function() {
            expect(date.addMonthIfNecessary('3', reference)).to.equal('3 Jan');
        });
        it('using next month if necessary', function() {
			expect(date.addMonthIfNecessary('1', reference)).to.equal('1 Feb');
        });
        it('only if a day is given at all', function () {
			expect(date.addMonthIfNecessary('0:00')).to.equal('0:00');
        });
        it('using next month for today', function() {
            expect(date.addMonthIfNecessary('2', reference)).to.equal('2 Feb');
        });
		it('but only if no month is given', function() {
            expect(date.addMonthIfNecessary('3 jan')).to.equal('3 jan');
		});
    });
    describe('recognizes month when given as three letters', function() {
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
});
