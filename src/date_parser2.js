var moment = require('moment');
var r = require('ramda');
var m = require('./misc');

var allWeekdays = r.concat(moment.weekdays(), moment.weekdaysShort());
var allWeekdaysInLowerCase = r.map(r.func('toLowerCase'))(allWeekdays);
var isWeekday = function(dateSpec) {
    return r.contains(dateSpec.toLowerCase())(allWeekdaysInLowerCase);
};

var hasUnusedInput = function(moment) {
    return !r.isEmpty(moment.parsingFlags().unusedInput);
};
var hasUnusedParsingTokens = function(moment) {
    return !r.isEmpty(moment.parsingFlags().unusedTokens);
};

var future = function(dateSpec, reference) {
    if (r.isEmpty(dateSpec) || !moment(reference).isValid()) return moment.invalid();

    var result;

    result = moment(dateSpec, 'H:mm');
    if (!hasUnusedParsingTokens(result) && !hasUnusedInput(result)) return result;

    result = moment(dateSpec, 'D MMM');
    if (result.isValid() && !hasUnusedInput(result)) return result;

    result = moment(dateSpec, 'D MMM H:mm');
    if (result.isValid() && !hasUnusedInput(result)) return result;

    if (isWeekday(dateSpec)) {
        result = reference || moment().startOf('day');
        result.day(dateSpec);
        if (!hasUnusedParsingTokens(result)) return result;
    }

    var dateSpecTokens = m.split(dateSpec);
    var tailAsMoment = future(m.join(r.tail(dateSpecTokens)));
    return future(r.head(dateSpecTokens), tailAsMoment);
};

module.exports = {
    future: future
};
