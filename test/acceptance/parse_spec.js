var parser = require('parse');
var moment = require('moment');
var tomorrow = require('../_date_helper').tomorrow;

describe('Parser parses events', function() {
    it('without extension', function() {
        var tomorrowOneOclock = tomorrow().hour(1).toDate();
        parser.parse('tomorrow 1:00 foo').should.containDeep({
            start: tomorrowOneOclock,
            end: tomorrowOneOclock,
            isAllDay: false,
            title: 'foo'
        });
    });

    var tomorrowFromOneToTwo = {
            start: tomorrow().hour(1).toDate(),
            end: tomorrow().hour(2).toDate(),
            isAllDay: false,
            title: 'foo'
    };

    it('with explicit duration', function() {
        parser.parse('tomorrow 1:00 60min foo').should.containDeep(tomorrowFromOneToTwo);
    });

    it('with explicit end', function() {
        parser.parse('tomorrow 1:00 to tomorrow 2:00 foo').should.containDeep(tomorrowFromOneToTwo);
    });

    it('all-day events', function() {
        parser.parse('tomorrow foo').should.containDeep({
            start: tomorrow().toDate(),
            end: tomorrow().toDate(),
            isAllDay: true,
            title: 'foo'
        });
    });
});
