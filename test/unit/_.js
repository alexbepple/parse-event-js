require('must');

var chai = require('chai');

global.expect = chai.expect;

var q = require('parse');

chai.Assertion.addProperty('future', function() {
    var date = this._obj;
    this.assert(
        date.isFuture(),
        'expected #{act} to be in the future',
        'expected #{act} to not be in the future',
        null,
        date.short()
    );
});

chai.Assertion.addProperty('allDay', function() {
    var event = this._obj;
    this.assert(
        event.isAllDay,
        'expected #{act} to be all-day',
        'expected #{act} not to be all-day',
        null,
        event
    );
});

chai.Assertion.addProperty('containMonth', function() {
    this.assert(
        q.containsMonth(this._obj),
        'expected #{act} to contain month',
        'expected #{act} not to contain month',
        null,
        this._obj
    );
});
