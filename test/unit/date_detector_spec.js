var x = require('date_detector');

describe('Date detector', function() {
	it('saves date from input in given property', function() {
		x.detect('tomorrow').date.should.be.date('tomorrow');
	});
	it('saves unprocessed tail of input', function() {
		x.detect('tomorrow').tail.should.equal('');
	});

    it('only creates future dates', function() {
		var todayAsDayOfWeek = Date.create().format('{dow}');
		x.detect(todayAsDayOfWeek).date.should.be.future();
    });
    it('avoids edge cases of Sugar’s date parsing', function() {
        var edgeCase = x.detect('1 Novotel');
        edgeCase.date.should.be.future();
    });

    describe('supplements missing month', function() {
        var reference;
        beforeEach(function() {
            reference = Date.create('2 Jan');
        });
		it('if none is given', function() {
			var now = Date.create();
			var todayAsDayOfMonth = now.format('{d}');
			var oneMonthLater = now.clone().addMonths(1).format('{d} {mon}');
			x.detect(todayAsDayOfMonth).should.deep.equal(x.detect(oneMonthLater));
		});
        it('using current month', function() {
            x.addMonthIfNecessary('3', reference).should.equal('3 Jan');
        });
        it('using next month if necessary', function() {
			x.addMonthIfNecessary('1', reference).should.equal('1 Feb');
        });
        it('only if a day is given at all', function () {
			x.addMonthIfNecessary('0:00').should.equal('0:00');
        });
        it('using next month for today', function() {
            x.addMonthIfNecessary('2', reference).should.equal('2 Feb');
        });
		it('but only if no month is given', function() {
			x.addMonthIfNecessary('3 jan', reference).should.equal('3 jan');
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

    describe('expands abbreviations', function() {
        it('tomorrow', function() {
			x.detect('tom').should.deep.equal(x.detect('tomorrow'));
        });
        it('for weekdays', function() {
			x.detect('sun').should.deep.equal(x.detect('sunday'));
        });
    });

    describe('detects times as groups of digits without separator', function() {
        it('like 0100', function() {
            x.detect('0100').should.deep.equal(x.detect('01:00'));
        });
        it('like 100', function() {
            x.detect('100').should.deep.equal(x.detect('1:00'));
        });
    });
});
