var moment = require('moment');
var r = require('ramda');
var m = require('./misc');

var allMonths = r.concat(moment.months(), moment.monthsShort());
var allMonthsInLowerCase = r.map(r.func('toLowerCase'))(allMonths);
var isMonth = function(dateSpec) {
    return r.contains(dateSpec.toLowerCase())(allMonthsInLowerCase);
};
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

var copy = function(unit, from, to) {
    to[unit].call(to, from[unit].call(from));
};

var future = function(dateSpec, reference, mutatedMoment) {
    reference = reference || moment();
    mutatedMoment = mutatedMoment || reference.clone().startOf('day');
    if (r.isEmpty(dateSpec)) return mutatedMoment;

    var tokens = m.split(dateSpec);
    var token = r.head(tokens);
    var restOfSpec = m.join(r.tail(tokens));

    var timeComponent = moment(token, 'H:mm');
    if (!hasUnusedParsingTokens(timeComponent) && !hasUnusedInput(timeComponent)) {
        copy('hours', timeComponent, mutatedMoment);
        copy('minutes', timeComponent, mutatedMoment);
        while (!mutatedMoment.isAfter(reference)) mutatedMoment.add(1, 'days');
        return future(restOfSpec, reference, mutatedMoment);
    }

    var date = moment(token, 'D');
    if (date.isValid() && !hasUnusedInput(date)) {
        copy('date', date, mutatedMoment);
        while (!mutatedMoment.isAfter(reference)) mutatedMoment.add(1, 'month');
        return future(restOfSpec, reference, mutatedMoment);
    }

    if (isMonth(token)) {
        mutatedMoment.month(token);
        while (!mutatedMoment.isAfter(reference)) mutatedMoment.add(1, 'year');
        return future(restOfSpec, reference, mutatedMoment);
    }

    if (isWeekday(token)) {
        mutatedMoment.day(token);
        while (!mutatedMoment.isAfter(reference)) mutatedMoment.add(7, 'days');
        return future(restOfSpec, reference, mutatedMoment);
    }

    return moment.invalid();
};

module.exports = {
    future: future
};
