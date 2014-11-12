var moment = require('moment');
var r = require('ramda');
var m = require('./misc');

var toLowerCase = r.map(r.func('toLowerCase'));
var allMonths = r.concat(moment.months(), moment.monthsShort());
var allMonthsInLowerCase = toLowerCase(allMonths);
var isMonth = function(dateSpec) {
    return r.contains(dateSpec.toLowerCase())(allMonthsInLowerCase);
};
var allWeekdays = r.concat(moment.weekdays(), moment.weekdaysShort());
var allWeekdaysInLowerCase = toLowerCase(allWeekdays);
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
    var unitAccessor = r.func(unit);
    unitAccessor(to, unitAccessor(from));
};

var future = function(dateSpec, reference, mutatedMoment) {
    if (r.isEmpty(dateSpec) && reference === undefined) return moment.invalid();

    reference = reference || moment();
    mutatedMoment = mutatedMoment || reference.clone().startOf('day');
    if (r.isEmpty(dateSpec)) return mutatedMoment;

    var tokens = m.split(dateSpec);
    var token = r.head(tokens);
    var restOfSpec = m.join(r.tail(tokens));

    if (token.indexOf('tom') === 0) {
        mutatedMoment.add(1, 'day');
        return future(restOfSpec, reference, mutatedMoment);
    }

    if (token === 'eod') token = '23:59';
    if (/^\d{3}$/.test(token)) token = '0' + token;
    var timeComponent = moment(token, 'H:mm');
    if (!hasUnusedParsingTokens(timeComponent) && !hasUnusedInput(timeComponent)) {
        copy('hours', timeComponent, mutatedMoment);
        copy('minutes', timeComponent, mutatedMoment);
        if (!mutatedMoment.isAfter(reference)) 
            mutatedMoment.add(1, 'days');
        return future(restOfSpec, reference, mutatedMoment);
    }

    var date = moment(token, 'D');
    if (date.isValid() && !hasUnusedInput(date)) {
        copy('date', date, mutatedMoment);
        if (!mutatedMoment.isAfter(reference)) 
            mutatedMoment.add(1, 'month');
        return future(restOfSpec, reference, mutatedMoment);
    }

    if (isMonth(token)) {
        mutatedMoment.month(token);
        if (!mutatedMoment.isAfter(reference)) 
            mutatedMoment.add(1, 'year');
        return future(restOfSpec, reference, mutatedMoment);
    }

    if (isWeekday(token)) {
        mutatedMoment.day(token);
        if (!mutatedMoment.isAfter(reference)) 
            mutatedMoment.add(7, 'days');
        return future(restOfSpec, reference, mutatedMoment);
    }

    return moment.invalid();
};

var specifiesTime = function (dateSpec) {
    var token = dateSpec;

    var isTime = function (token) {
        // copied code
        if (token === 'eod') token = '23:59';
        if (/^\d{3}$/.test(token)) token = '0' + token;
        var timeComponent = moment(token, 'H:mm');
        return (!hasUnusedParsingTokens(timeComponent) && !hasUnusedInput(timeComponent));
    };

    return r.some(isTime)(m.split(dateSpec));
};

module.exports = {
    future: future,
    specifiesTime: specifiesTime
};
