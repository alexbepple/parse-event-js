future = require('date_parser2').future
specifiesTime = require('date_parser2').specifiesTime
moment = require('moment')
require! {
    '../helpers/hamjest_expect': {expect:demand}
    '../matchers/hamjest_date_expect': {equalDate}
}

describe 'Date parser: #future', ->
    specify 'technically creates a Moment.js moment', ->
        expect(moment.isMoment(future(''))).to.beTrue()


    describe 'creates invalid date', ->
        specify 'from empty spec with reference date', ->
            expect(future('', moment())).not.to.be.valid()

        specify 'from unparseable spec', ->
            expect(future('foo')).not.to.be.valid()


    describe 'creates date from day of month', ->
        specify '', ->
            expect(future('1').date()).to.equal(1)

        specify 'in the reference month', ->
            expect(future('2', moment('2010-01-01')).month()).to.equal(0)

        specify 'advancing to next month for today’s day of month', ->
            expect(future('1', moment('2010-01-01')).month()).to.equal(1)


    describe 'creates date from month', ->
        specify 'from capital case and long form', ->
            expect(future('January').month()).to.equal(0)

        specify 'from lower case', ->
            expect(future('january').month()).to.equal(0)

        specify 'from short form', ->
            expect(future('jan').month()).to.equal(0)

        specify 'in the reference year', ->
            expect(future('feb', moment('2010-01-01')).year()).to.equal(2010)

        specify 'advancing to next year for current month', ->
            expect(future('jan', moment('2010-01-01')).year()).to.equal(2011)


    describe 'creates date from day of week', ->
        specify 'from capital case and long form', ->
            expect(future('Monday').day()).to.equal(1)

        specify 'from lower case', ->
            expect(future('monday').day()).to.equal(1)

        specify 'from short form', ->
            expect(future('mon').day()).to.equal(1)

        specify 'at start of day', ->
            expect(future('mon')).to.be.date(future('mon').startOf('day'))

        specify 'in same week', ->
            monday = moment().day(1)
            demand future('tue', monday.clone()) .to equalDate monday.add 1 \day

        specify 'advancing a week for today’s day of week', ->
            monday = moment().day(1)
            demand future 'mon', monday.clone() .to equalDate monday.add 1 \week


    describe 'creates date from time', ->
        specify 'like 01:00', ->
            expect(future('01:00').hour()).to.equal(1)

        specify 'like 0100', ->
            expect(future('0100')).to.be.date(future('01:00'))

        specify 'like 100', ->
            expect(future('100')).to.be.date(future('1:00'))

        specify 'without seconds', ->
            expect(future('1:00')).to.be.date(future('1:00').startOf('minute'))

        specify 'on same day', ->
            oneOclock = moment().hour(1).minutes(0)
            expect(future('1:01', oneOclock.clone()).date()).to.equal(oneOclock.date())

        specify 'advancing to next day for current time', ->
            oneMinutePastOne = moment().startOf('minute').hour(1).minutes(0)
            oneOclockNextDay = oneMinutePastOne.clone().add(1, 'day').minutes(0)
            expect(future('01:00', oneMinutePastOne)).to.be.date(oneOclockNextDay)

        specify 'invalidates date when there is superfluous input', ->
            expect(future('01:00 foo')).not.to.be.valid()


    describe 'creates date from combination of', ->
        specify 'day of week + time', ->
            expect(future('mon 01:00')).to.be.date(future('mon').hour(1).minutes(0))

        specify 'date + time', ->
            expect(future('1 jan 01:00')).to.be.date(future('1 jan').hour(1).minutes(0))


    specify 'avoids edge cases of Moment.js date parsing', ->
        expect(future('Novotel')).not.to.be.valid()


    specify 'understands convenience term "tomorrow"', ->
        expect(future('tomorrow')).to.be.after(moment())

    specify 'and its abbreviation', ->
        expect(future('tom')).to.be.date(future('tomorrow'))


    specify "understands convenience term 'eod'", ->
        expect(future('eod')).to.be.date(future('23:59'))


describe 'Date parser: #specifiesTime', ->
    specify 'recognizes a time at beginning', ->
        expect(specifiesTime('00:00')).to.beTrue()

    specify 'recognizes a time in short form', ->
        expect specifiesTime('0000') .to.beTrue()

    specify 'recognizes a time not at beginning', ->
        expect(specifiesTime('tom 00:00')).to.beTrue()

    specify 'recognizes when no time is specified', ->
        expect(specifiesTime('')).to.beFalse()

