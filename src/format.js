require('sugar');
var util = require('util');

var formatForAddEvent = function (event) {
    return util.format("-start '%s' -allDay %s -durationInSeconds %d -title '%s'", event.start, event.isAllDay, event.durationInSeconds, event.title);
};

exports = Object.merge(exports, {
    formatForAddEvent: formatForAddEvent
});

