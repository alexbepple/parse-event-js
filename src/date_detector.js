require('sugar');

var r = require('ramda');
var m = require('./misc');

var noOfTokensThatContainDate = function (tokens) {
    var doesThisNumberOfTokensContainDate = r.range(0, tokens.length).map(function (n) {
        var date = createDate(m.join(r.take(n+1, tokens)));
        return date.isValid() && date.isFuture();
    });
    return doesThisNumberOfTokensContainDate.lastIndexOf(true) + 1;
};

var createDate = function (dateSpec) {
	return Date.future(dateSpec);
};

var detectDate = function (input, targetProperty) {
    var tokens = m.split(input);

    var noOfTokensForStart = noOfTokensThatContainDate(tokens);
	var tokensAfterStart = r.skip(noOfTokensForStart, tokens);

	return {
		date: createDate(m.join(r.take(noOfTokensForStart, tokens))),
		tail: m.join(tokensAfterStart)
	};
};

var guessMonth = function (day, reference) {
    var dayWithCurrentMonth = Date.create(reference).set({day: day});
    var dayWithNextMonth = Date.create(dayWithCurrentMonth).advance({month: 1});

    var dates = [dayWithCurrentMonth, dayWithNextMonth];
    var closestFutureDate = dates.find(function(d){return d.isAfter(reference);});

    return closestFutureDate.format('{Mon}');
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
