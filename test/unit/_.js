var chai = require('chai');
var Assertion = chai.Assertion;

chai.should();
global.expect = chai.expect;

var q = require('parse');

Assertion.addMethod('future', function() {
    var date = this._obj;
    this.assert(
        date.isFuture(),
        'expected #{act} to be in the future',
        'expected #{act} to not be in the future',
        null,
        date.short()
    );
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

Assertion.addMethod('containMonth', function() {
    this.assert(
        q.containsMonth(this._obj),
        'expected #{act} to contain month',
        'expected #{act} not to contain month',
        null,
        this._obj
    );
});
