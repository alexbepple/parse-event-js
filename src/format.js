require('sugar');
var util = require('util');

var formatForAddEvent = function (event) {
    return util.format("-start '%s' -allDay %s -title '%s'", event.start, event.isAllDay, event.title);
};

exports = Object.merge(exports, {
    formatForAddEvent: formatForAddEvent
});

