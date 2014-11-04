require('sugar');
var moment = require('moment');
var r = require('ramda');
var m = require('./misc');

var noOfTokensThatContainDate = function (tokens) {
    var now = moment();
    var takeX = function (_, idx, array) { return r.take(idx+1, array); };
    var makeForValidDate = function (tokens) {
        var aMoment = moment(createDateFromTokens(tokens));
        return aMoment.isValid() && aMoment.isAfter(now);
    };
    var noOfTokensThatContainDate = r.pipe(
        r.map.idx(takeX), r.findLastIndex(makeForValidDate), r.add(1));
    return noOfTokensThatContainDate(tokens);
};

var createDate = function (dateSpec) {
	return Date.future(dateSpec);
};
var createDateFromTokens = r.pipe(m.join, createDate);

var detectDate = function (input) {
    var tokens = m.split(input);
    var noOfTokensForDate = noOfTokensThatContainDate(tokens);
	return {
		date: createDateFromTokens(r.take(noOfTokensForDate, tokens)),
		tail: m.join(r.skip(noOfTokensForDate, tokens))
	};
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

module.exports = {
	detect: r.pipe(
		disambiguateTimes, expandAbbreviations, addMonthIfNecessary, detectDate
    ),
	addMonthIfNecessary: addMonthIfNecessary,
	containsMonth: containsMonth
};
