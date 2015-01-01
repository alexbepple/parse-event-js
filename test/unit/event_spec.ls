require! {
    moment
    event: Event
    hamjest: {assertThat, is:_is, not:_not}:_
    '../hamjest/date': {allDay, notAllDay}
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


describe 'Event that starts at midnight' ->
    specify 'and has neither an end nor an extension is an all-day event' ->
        assertThat (Event {
            start: moment('2010-01-01 00:00')
        }), _is allDay()
    specify 'and ends at midnight is an all-day event' ->
        assertThat (Event {
            start: moment('2010-01-01 00:00')
            end: moment('2010-01-02 00:00')
        }), _is allDay()
    specify 'and ends not at midnight is not an all-day event' ->
        assertThat (Event {
            start: moment('2010-01-01 00:00')
            end: moment('2010-01-01 01:00')
        }), _is notAllDay()


describe 'All-day event' ->
    specify 'without duration ends a day later' ->
        expect Event {
            start: moment('2014-01-01 00:00')
            end: moment.invalid()
            durationInSeconds: 0
        } .to.end '2014-01-02 00:00'
    specify 'with duration ends exactly as determined by duration' ->
        expect Event {
            start: moment '2014-01-01 00:00'
            end: moment.invalid()
            durationInSeconds: 60
        } .to.end '2014-01-01 00:01'

