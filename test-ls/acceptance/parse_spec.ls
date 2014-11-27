require! {
    parse: parser
    moment
    '../_date_helper': {tomorrow}
}

describe 'Event parser parses events' ->
    specify 'without extension' ->
        tomorrowOneOclock = tomorrow().hour(1).toDate()
        parser.parse 'tomorrow 1:00 foo' .should.deep.contain {
            start: tomorrowOneOclock
            end: tomorrowOneOclock
            isAllDay: false
            title: 'foo'
        }

    tomorrowFromOneToTwo = {
        start: tomorrow().hour(1).toDate()
        end: tomorrow().hour(2).toDate()
        isAllDay: false
        title: 'foo'
    }

    specify 'with explicit duration' ->
        parser.parse 'tomorrow 1:00 60min foo' .should.deep.contain tomorrowFromOneToTwo

    specify 'with explicit end' ->
        parser.parse 'tomorrow 1:00 to 2:00 foo' .should.deep.contain tomorrowFromOneToTwo

    specify 'all-day events' ->
        parser.parse 'tomorrow foo' .should.deep.contain {
            start: tomorrow().toDate()
            end: tomorrow().toDate()
            isAllDay: true
            title: 'foo'
        }
