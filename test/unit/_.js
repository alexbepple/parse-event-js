var chai = require('chai');
var Assertion = chai.Assertion;
var util = require('util');

chai.should();
global.expect = chai.expect;

var formatDate = function (date) {
    return date.format('{yyyy}-{MM}-{dd} {HH}:{mm}');
};

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

Assertion.addMethod('date', function(dateAsString) {
    var date = this._obj;
    this.assert(
        date.is(dateAsString),
        util.format("expected '%s' to be #{exp}", formatDate(date)),
        util.format("expected '%s' not to be #{exp}", formatDate(date)),
        dateAsString,
        date
    );
});

Assertion.addMethod('start', function(dateAsString) {
    var event = this._obj;
    new Assertion(event.start).to.be.date(dateAsString);
});

Assertion.addMethod('end', function(dateAsString) {
    var event = this._obj;
    new Assertion(event.end).to.be.date(dateAsString);
});

var q = require('parse');

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

