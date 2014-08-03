require('sugar');
var util = require('util');

var formatForAddEvent = function (event) {
    return util.format("-title '%s' -start '%s'", event.title, event.start);
};

exports = Object.merge(exports, {
    formatForAddEvent: formatForAddEvent
});

