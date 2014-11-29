require! {
    moment
    chai: {expect}
    format: {formatForAddEvent}
}

describe 'Date formatter', ->
    specify 'formats title', ->
        expect formatForAddEvent {title: 'foo'} .to.include("-title 'foo'")

    specify 'formats start', ->
        expect(
            formatForAddEvent { start: moment('2014-01-01 01:01').toDate() }
        ).to.include("-start '2014-01-01 01:01'")


