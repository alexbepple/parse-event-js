var moment = require('moment');

module.exports = {
	invalidDate: function() { return moment.invalid().toDate(); }
};

