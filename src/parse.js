require('sugar');
var util = require('util');
var _ = require('underscore');
var juration = require('./juration/juration');

var split = function (input) { return input.split(' '); };
var join = function (array) { return array.join(' '); };

var wordsThatCanBeAbbreviated = 
    split('today tomorrow monday tuesday wednesday thursday friday saturday sunday');

var expandAbbreviation = function (match) {
    return wordsThatCanBeAbbreviated.concat(match).find(function (element) {
        return element.indexOf(match) === 0;
    });
};
var expandAbbreviations = function (input) {
    return input.replace(/\w+/, expandAbbreviation);
};

var guessMonth = function (day, reference) {
    var dayWithCurrentMonth = Date.create(reference).set({day: day});
    var dayWithNextMonth = Date.create(dayWithCurrentMonth).advance({month: 1});

    var dates = [dayWithCurrentMonth, dayWithNextMonth];
    var closestFutureDate = dates.find(function(d){return d.isAfter(reference);});

    return closestFutureDate.format('{Mon}');
};
var containsMonth = function (input) {
    return (/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i).test(input);
};
var containsDay = function (input) {
    return (/^\d{1,2}$/).test(split(input)[0]);
};
var addMonthIfNecessary = function (input, reference) {
    if (!containsDay(input) || containsMonth(input)) return input;

    var tokens = split(input);
    var guessedMonth = guessMonth(tokens[0], reference);
    return join(tokens.include(guessedMonth, 1));
};

var noOfTokensThatContainDate = function (tokens) {
    var doesThisNumberOfTokensContainDate = (1).upto(tokens.length).map(function (n) {
        return Date.create(join(tokens.first(n))).isValid();
    });
    return doesThisNumberOfTokensContainDate.lastIndexOf(true) + 1;
};

var createDate = function (dateSpec) {
	return Date.future(dateSpec);
};

var containsTime = function (input) {
	return (/\d{1,2}:\d{2}/).test(input);
};
var disambiguateTimes = function (input) {
    return input.replace(/(\d{1,2})(\d{2})/, '$1:$2');
};

var noOfTokensThatContainDuration = function (tokens) {
	var doesThisNumberOfTokensContainDuration = (1).upto(tokens.length).map(function (n) {
		try {
			juration.parse(join(tokens.first(n)));
			return true;
		} catch (err) {
			return false;
		}
	});
	return doesThisNumberOfTokensContainDuration.lastIndexOf(true) + 1;
};

var durationInSeconds = function (tokens) {
	if (tokens.isEmpty()) return 0;
	return juration.parse(join(tokens));
};

var parse = function (input) {
    var tokens = split(input);
    var noOfTokensForStart = noOfTokensThatContainDate(tokens);
	var start = createDate(join(tokens.first(noOfTokensForStart)));

	var tokensAfterStart = tokens.from(noOfTokensForStart);
	var noOfTokensForDuration = noOfTokensThatContainDuration(tokensAfterStart);
	var noOfTokensBeforeTitle = noOfTokensForStart + noOfTokensForDuration;
	
    return {
        start: start.format('{yyyy}-{MM}-{dd} {HH}:{mm}'),
		isAllDay: !containsTime(input),
		durationInSeconds: durationInSeconds(
			tokensAfterStart.first(noOfTokensForDuration)),
        title: join(tokens.from(noOfTokensBeforeTitle))
    };
};

var preprocessThenParse = function (input) {
    return _.compose(
        parse, addMonthIfNecessary, expandAbbreviations, disambiguateTimes
    ).call(this, input);
};

exports = Object.merge(exports, {
	disambiguateTimes: disambiguateTimes,

	createDate: createDate,

    addMonthIfNecessary: addMonthIfNecessary,
    containsMonth: containsMonth,
    containsDay: containsDay,
    guessMonth: guessMonth,

    expandAbbreviations: expandAbbreviations,
    parse: preprocessThenParse,
});

