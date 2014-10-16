var Assertion = require('chai').Assertion;
require('./_date_assertions');

Assertion.addMethod('start', function(dateAsString) {
    var event = this._obj;
    new Assertion(event.start).to.be.date(dateAsString);
});

Assertion.addMethod('end', function(dateAsString) {
    var event = this._obj;
    new Assertion(event.end).to.be.date(dateAsString);
});

Assertion.addMethod('allDay', function() {
    var event = this._obj;
    this.assert(
        event.isAllDay,
        'expected #{act} to be all-day',
        'expected #{act} not to be all-day',
        null,
        event
    );
});

