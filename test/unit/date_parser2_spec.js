var future = require('date_parser2').future;
var moment = require('moment');

describe('New date parser: #future', function() {
    it('technically creates a Moment.js moment', function() {
        expect(moment.isMoment(future(''))).to.be.truthy();
    });

    describe('creates date from D MMM (day of month and short month)', function() {
        it('when month in capital case', function() {
            var jan1 = future('1 Jan');
            expect(jan1.date()).to.equal(1);
            expect(jan1.month()).to.equal(0);
        });
        it('when month in lowercase', function() {
            expect(future('1 jan')).to.be.date(future('1 Jan'));
        });
        it('when date not 1st of month', function() {
            expect(future('2 jan').date()).to.equal(2);
        });
        it('invalidates date when there is superfluous input', function() {
            expect(future('1 jan foo')).not.to.be.valid();
        });
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
        it('only future date (variation)', function() {
            var monday = moment('3000-01-01').day(1);
            expect(future('Sunday', monday.clone())).to.be.after(monday);
        });
    });
    
    describe('creates date from time', function() {
        it('', function() {
            expect(future('01:00').hour()).to.equal(1);
        });
        it('without seconds', function() {
            expect(future('1:00')).to.be.date(future('1:00').startOf('minute'));
        });
        it('only future date', function() {
            var oneMinutePastOne = moment().startOf('minute').hour(1).minutes(1);
            var oneOclockNextDay = oneMinutePastOne.clone().add(1, 'day').minutes(0);
            expect(future('01:00', oneMinutePastOne)).to.be.date(oneOclockNextDay);
        });
        it('invalidates date when there is superfluous input', function() {
            expect(future('01:00 foo')).not.to.be.valid();
        });
    });
    
    it('creates date from day of week + time', function() {
        expect(future('Monday 01:00')).to.be.date(future('mon').hour(1).minutes(0));
    });
    it('creates date from date + time', function() {
        expect(future('1 Jan 01:00')).to.be.date(future('1 Jan').hour(1).minutes(0));
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
});
