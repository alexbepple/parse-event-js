var moment = require('moment');

module.exports = {
    tomorrow: function() { return moment().add(1, 'day').startOf('day'); }
};

