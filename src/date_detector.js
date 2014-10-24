var _ = require('underscore');

var split = function (input) { return input.split(' '); };
var join = function (array) { return array.join(' '); };

var noOfTokensThatContainDate = function (tokens) {
    var doesThisNumberOfTokensContainDate = (1).upto(tokens.length).map(function (n) {
        var date = createDate(join(tokens.first(n)));
        return date.isValid() && date.isFuture();
    });
    return doesThisNumberOfTokensContainDate.lastIndexOf(true) + 1;
};

var createDate = function (dateSpec) {
	return Date.future(dateSpec);
};

var detectDate = function (input, targetProperty) {
    var tokens = split(input);

    var noOfTokensForStart = noOfTokensThatContainDate(tokens);
	var tokensAfterStart = tokens.from(noOfTokensForStart);

	return {
		date: createDate(join(tokens.first(noOfTokensForStart))),
		tail: join(tokensAfterStart)
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
    return (/^\d{1,2}$/).test(split(input)[0]);
};
var addMonthIfNecessary = function (input, reference) {
	if (!containsDay(input) || containsMonth(input)) return input;

    var tokens = split(input);
    var guessedMonth = guessMonth(tokens[0], reference);
    return join(tokens.include(guessedMonth, 1));
};


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

var disambiguateTimes = function (input) {
    return input.replace(/(\d{1,2})(\d{2})/, '$1:$2');
};

module.exports = {
	detect: _.compose(
        detectDate, addMonthIfNecessary, expandAbbreviations, disambiguateTimes
    ),
	addMonthIfNecessary: addMonthIfNecessary,
	containsMonth: containsMonth
};
