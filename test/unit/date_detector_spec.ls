require! {
    moment
    sinon
    'date_detector': {detectDate}
}

describe 'Date detector', ->
    specify 'saves detected date and unprocessed tail', ->
        wrongDate = moment '2000-01-01'
        rightDate = moment '2010-01-01'

        futureStub = sinon.stub()
        futureStub.withArgs('date', 'reference').returns wrongDate
        futureStub.withArgs('date spec', 'reference').returns rightDate
        futureStub.returns moment.invalid!
        dateParserStub = {future: futureStub}

        dateMatch = detectDate dateParserStub, 'date spec foo', 'reference', {}
        expect dateMatch.date .to.be.date rightDate
        expect dateMatch.tail .to.equal 'foo'
