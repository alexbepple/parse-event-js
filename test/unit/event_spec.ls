require! {
    moment
    event: Event
}

describe 'Event' ->
    event = Event {
        start: moment()
        end: moment.invalid()
    }
    start = event.start.clone()

    specify 'remembers its start' ->
        event.should.start start

    specify 'disregards an invalid end' ->
        event.should.end start


describe 'Event with start date and duration' ->
    event = Event {
        start: moment('2014-01-01 01:01')
        end: moment.invalid()
        durationInSeconds: 60
    }

    specify 'knows when it ends' ->
        expect event .to.end '2014-01-01 01:02'

    specify 'preserves its start date' ->
        expect event .to.start '2014-01-01 01:01'


describe 'All-day event' ->
    specify 'ends a day later' ->
        expect Event {
            start: moment('2014-01-01 00:00')
            end: moment.invalid()
            isAllDay: true
        } .to.end '2014-01-02 00:00'

