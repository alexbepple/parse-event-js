var future = require('date_parser2').future;
var specifiesTime = require('date_parser2').specifiesTime;
var moment = require('moment');

describe('Date parser: #future', function() {
    it('technically creates a Moment.js moment', function() {
        expect(moment.isMoment(future(''))).to.beTrue();
    });

    describe('creates invalid date', function() {
        it('from empty spec with reference date', function() {
            expect(future('', moment())).not.to.be.valid();
        });
        it('from unparseable spec', function() {
            expect(future('foo')).not.to.be.valid();
        });
    });

    describe('creates date from day of month', function() {
        it('', function() {
            expect(future('1').date()).to.equal(1);
        });
        it('in the reference month', function() {
            expect(future('2', moment('2010-01-01')).month()).to.equal(0);
        });
        it('advancing to next month for today’s day of month', function() {
            expect(future('1', moment('2010-01-01')).month()).to.equal(1);
        });
    });

    describe('creates date from month', function() {
        it('from capital case and long form', function() {
            expect(future('January').month()).to.equal(0);
        });
        it('from lower case', function() {
            expect(future('january').month()).to.equal(0);
        });
        it('from short form', function() {
            expect(future('jan').month()).to.equal(0);
        });
        it('in the reference year', function() {
            expect(future('feb', moment('2010-01-01')).year()).to.equal(2010);
        });
        it('advancing to next year for current month', function() {
            expect(future('jan', moment('2010-01-01')).year()).to.equal(2011);
        });
    });

    describe('creates date from day of week', function() {
        it('from capital case and long form', function() {
            expect(future('Monday').day()).to.equal(1);
        });
        it('from lower case', function() {
            expect(future('monday').day()).to.equal(1);
        });
        it('from short form', function() {
            expect(future('mon').day()).to.equal(1);
        });
        it('at start of day', function() {
            expect(future('mon')).to.be.date(future('mon').startOf('day'));
        });
        it('in same week', function () {
            var monday = moment().day(1);
            expect(future('tue', monday.clone()).date()).to.equal(monday.add(1, 'day').date());
        });
        it('advancing a week for today’s day of week', function() {
            var monday = moment().day(1);
            expect(future('mon', monday.clone()).date()).to.equal(monday.add(7, 'days').date());
        });
    });
    
    describe('creates date from time', function() {
        it('like 01:00', function() {
            expect(future('01:00').hour()).to.equal(1);
        });
        it('like 0100', function() {
            expect(future('0100')).to.be.date(future('01:00'));
        });
        it('like 100', function() {
            expect(future('100')).to.be.date(future('1:00'));
        });
        it('without seconds', function() {
            expect(future('1:00')).to.be.date(future('1:00').startOf('minute'));
        });
        it('on same day', function() {
            var oneOclock = moment().hour(1).minutes(0);
            expect(future('1:01', oneOclock.clone()).date()).to.equal(oneOclock.date());
        });
        it('advancing to next day for current time', function() {
            var oneMinutePastOne = moment().startOf('minute').hour(1).minutes(0);
            var oneOclockNextDay = oneMinutePastOne.clone().add(1, 'day').minutes(0);
            expect(future('01:00', oneMinutePastOne)).to.be.date(oneOclockNextDay);
        });
        it('invalidates date when there is superfluous input', function() {
            expect(future('01:00 foo')).not.to.be.valid();
        });
    });
    
    describe('creates date from combination of', function() {
        it('day of week + time', function() {
            expect(future('mon 01:00')).to.be.date(future('mon').hour(1).minutes(0));
        });
        it('date + time', function() {
            expect(future('1 jan 01:00')).to.be.date(future('1 jan').hour(1).minutes(0));
        });
    });

    it('avoids edge cases of Moment.js date parsing', function() {
        expect(future('Novotel')).not.to.be.valid();
    });

    it('understands convenience term "tomorrow"', function() {
        expect(future('tomorrow')).to.be.after(moment());
    });
    it('and its abbreviation', function() {
        expect(future('tom')).to.be.date(future('tomorrow'));
    });

    it("understands convenience term 'eod'", function() {
        expect(future('eod')).to.be.date(future('23:59'));
    });
});

describe('Date parser: #specifiesTime', function() {
    it('recognizes a time at beginning', function() {
        expect(specifiesTime('00:00')).to.beTrue();
    });
    it('recognizes a time not at beginning', function() {
        expect(specifiesTime('tom 00:00')).to.beTrue();
    });
    it('recognizes when no time is specified', function() {
        expect(specifiesTime('')).to.beFalse();
    });
});
