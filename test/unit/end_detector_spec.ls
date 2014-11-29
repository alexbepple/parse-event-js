moment = require('moment')
sinon = require('sinon')
end = require('end_detector')
require! {
    chai: {expect}
}

describe 'End detector', ->
    specify 'returns date from date detector using input minus 1st token', ->
        dateFromDateDetector = moment()
        dateDetectorStub = sinon.stub()
        dateDetectorStub.withArgs('bar', 'reference').returns({date: dateFromDateDetector})
        dateDetectorStub.returns({date: "'wrong input for date detector'"})
        detectEnd = end.detector(dateDetectorStub)

        expect detectEnd('foo bar', 'reference').date .to.equal dateFromDateDetector

    specify 'uses tail of date detector when it finds a date', ->
        resultWithValidDate = {
            date: moment()
            tail: 'tail from date detector'
        }
        successfullyDetectEnd = end.detector -> resultWithValidDate
        expect (.tail) successfullyDetectEnd('input', null) .to.equal 'tail from date detector'

    specify 'returns the input as the tail when it cannot find a date', ->
        dateDetectorResultWithInvalidDate = {
            date: moment.invalid()
            tail: 'tail from date detector'
        }
        failToDetectEnd = end.detector -> dateDetectorResultWithInvalidDate

        expect (.tail) failToDetectEnd('input', null) .to.equal 'input'

