var moment = require('moment');

module.exports = {
	invalidDate: function() { return moment.invalid().toDate(); },
    tomorrow: function() { return moment().add(1, 'day').startOf('day'); }
};

