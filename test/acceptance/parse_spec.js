var parser = require('parse');

describe('Parser parses events', function() {
    it('without extension', function() {
        parser.parse('tomorrow 1:00 foo').should.shallowDeepEqual({
            start: Date.future('tomorrow 1:00'),
            end: Date.future('tomorrow 1:00'),
            isAllDay: false,
            title: 'foo'
        });
    });

    var tomorrowFromOneToTwo = {
            start: Date.future('tomorrow 1:00'),
            end: Date.future('tomorrow 2:00'),
            isAllDay: false,
            title: 'foo'
    };

    it('with explicit duration', function() {
        parser.parse('tomorrow 1:00 60min foo').should.shallowDeepEqual(tomorrowFromOneToTwo);
    });

    it('with explicit end', function() {
        parser.parse('tomorrow 1:00 to tomorrow 2:00 foo').should.shallowDeepEqual(tomorrowFromOneToTwo);
    });

    it('all-day events', function() {
        parser.parse('tomorrow foo').should.shallowDeepEqual({
            start: Date.future('tomorrow 0:00'),
            end: Date.future('tomorrow 0:00'),
            isAllDay: true,
            title: 'foo'
        });
    });
});
