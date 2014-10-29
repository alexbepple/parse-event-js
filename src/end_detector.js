
var split = function (input) { return input.split(' '); };
var join = function (array) { return array.join(' '); };

var endDetector = function(detectDate) {
	return function(input) {
		var inputWithoutFirstToken = join(split(input).from(1));
		var endMatch = detectDate(inputWithoutFirstToken);
		if (!endMatch.date.isValid()) endMatch.tail = input;
		return endMatch;
	};
};

module.exports = {
	detector: endDetector
};
