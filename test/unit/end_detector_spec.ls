require! {
    moment
    sinon
    chai: {expect}
    end_detector: {detect-end}
}

describe 'End detector', ->
    specify 'returns date from date detector using input minus 1st token', ->
        dateFromDateDetector = moment()
        dateDetectorStub = sinon.stub()
        dateDetectorStub.withArgs('bar', 'reference').returns({date: dateFromDateDetector})
        dateDetectorStub.returns({date: "'wrong input for date detector'"})
        successfullyDetectEnd = detect-end(dateDetectorStub)

        expect successfullyDetectEnd('foo bar', 'reference').date .to.equal dateFromDateDetector

    specify 'uses tail of date detector when it finds a date', ->
        resultWithValidDate = {
            date: moment()
            tail: 'tail from date detector'
        }
        successfullyDetectEnd = detect-end -> resultWithValidDate
        expect (.tail) successfullyDetectEnd('input', null) .to.equal 'tail from date detector'

    specify 'returns the input as the tail when it cannot find a date', ->
        dateDetectorResultWithInvalidDate = {
            date: moment.invalid()
            tail: 'tail from date detector'
        }
        failToDetectEnd = detect-end -> dateDetectorResultWithInvalidDate

        expect (.tail) failToDetectEnd('input', null) .to.equal 'input'

