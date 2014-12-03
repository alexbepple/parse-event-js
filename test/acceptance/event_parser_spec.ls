require! {
    event_parser: {parseEvent}
    '../_date_helper': {tomorrow}
    '../hamjest/expect': {expect, contain}
    '../hamjest/date_expect': {equalDateTime}
}

describe 'Event parser parses events' ->
    specify 'without extension' ->
        tomorrowOneOclock = tomorrow().hour(1)
        expect parseEvent 'tomorrow 1:00 foo' .to contain {
            start: equalDateTime tomorrowOneOclock
            end: equalDateTime tomorrowOneOclock
            isAllDay: false
            title: 'foo'
        }

    tomorrowFromOneToTwo = {
        start: equalDateTime tomorrow().hour(1)
        end: equalDateTime tomorrow().hour(2)
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
            start: equalDateTime tomorrow()
            isAllDay: true
            title: 'foo'
        }

