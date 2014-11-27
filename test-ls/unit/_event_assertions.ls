require! {
    chai: {Assertion}
    './_date_assertions'
}

Assertion.addMethod('start', (dateAsString) ->
    event = this._obj
    new Assertion(event.start).to.be.date(dateAsString)
)

Assertion.addMethod('end', (dateAsString) ->
    event = this._obj
    new Assertion(event.end).to.be.date(dateAsString)
)

Assertion.addMethod('allDay', ->
    event = this._obj
    this.assert(
        event.isAllDay
        'expected event to be all-day: \n' + JSON.stringify(event, null, '  ')
        'expected event not to be all-day: \n' + JSON.stringify(event, null, '  ')
    )
)

