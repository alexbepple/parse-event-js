var m = require('./misc');

var endDetector = function(detectDate) {
	return function(input) {
		var inputWithoutFirstToken = m.join(m.split(input).from(1));
		var endMatch = detectDate(inputWithoutFirstToken);
		if (!endMatch.date.isValid()) endMatch.tail = input;
		return endMatch;
	};
};

module.exports = {
	detector: endDetector
};
