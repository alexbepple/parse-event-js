require('sugar');
var r = require('ramda');
var m = require('./misc');
var moment = require('moment');
var newParser = require('./date_parser2');

var future = function(dateSpec) {
    var momentFromNewParser = newParser.future(dateSpec);
    if (momentFromNewParser.isAfter(moment())) return momentFromNewParser.toDate();
	return Date.future(dateSpec);
};

var invalidateIfNecessary = function(date) {
    var now = moment();
    if (moment(date).isAfter(now)) return date;
    return moment.invalid();
};

var wordsThatCanBeAbbreviated = 
    m.split('today tomorrow monday tuesday wednesday thursday friday saturday sunday');
var expandAbbreviation = function (match) {
    return wordsThatCanBeAbbreviated.concat(match).find(function (element) {
        return element.indexOf(match) === 0;
    });
};
var expandAbbreviations = function (input) {
    return input.replace(/\w+/, expandAbbreviation);
};

var disambiguateTimes = function (input) {
    return input.replace(/(\d{1,2})(\d{2})/, '$1:$2');
};


var guessMonth = function (day, reference) {
    var dayWithCurrentMonth = moment(reference).date(day);
    var dayWithNextMonth = dayWithCurrentMonth.clone().add(1, 'month');

    var dates = [dayWithCurrentMonth, dayWithNextMonth];
    var closestFutureDate = dates.find(function(d){return d.isAfter(reference);});

    return closestFutureDate.format('MMM');
};
var containsMonth = function (input) {
    return (/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i).test(input);
};
var containsDay = function (input) {
    return (/^\d{1,2}$/).test(m.split(input)[0]);
};
var addMonthIfNecessary = function (input, reference) {
	if (!containsDay(input) || containsMonth(input)) return input;

    var tokens = m.split(input);
    var guessedMonth = guessMonth(tokens[0], reference);
    return m.join(r.insert(1, guessedMonth, tokens));
};

module.exports = {
    future: r.pipe(disambiguateTimes, expandAbbreviations, addMonthIfNecessary, future, invalidateIfNecessary),
    addMonthIfNecessary: addMonthIfNecessary,
    containsMonth: containsMonth
};
