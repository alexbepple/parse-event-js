require! {
    event_parser: {parseEvent}
    '../_date_helper': {tomorrow}
    '../hamjest/expect': {expect, contain}
}

describe 'Event parser parses events' ->
    specify 'without extension' ->
        tomorrowOneOclock = tomorrow().hour(1).toDate()
        expect parseEvent 'tomorrow 1:00 foo' .to contain {
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
        expect parseEvent 'tomorrow 1:00 60min foo'
            .to contain tomorrowFromOneToTwo

    specify 'with explicit end' ->
        expect parseEvent 'tomorrow 1:00 to 2:00 foo'
            .to contain tomorrowFromOneToTwo

    specify 'all-day events' ->
        expect parseEvent 'tomorrow foo' .to contain {
            start: tomorrow().toDate()
            isAllDay: true
            title: 'foo'
        }

