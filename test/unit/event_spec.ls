require! {
    moment
    event: Event
    hamjest: {assertThat, is:_is}
    '../hamjest/event': {allDay, notAllDay, starts, ends}
}

describe 'Event' ->
    event = Event {
        start: moment()
        end: moment.invalid()
    }
    start = event.start.clone()

    specify 'remembers its start' ->
        assertThat event, starts start

    specify 'disregards an invalid end' ->
        assertThat event, ends start


describe 'Event with start date and duration' ->
    event = Event {
        start: moment('2014-01-01 01:01')
        end: moment.invalid()
        durationInSeconds: 60
    }

    specify 'knows when it ends' ->
        assertThat event, ends '2014-01-01 01:02'

    specify 'preserves its start date' ->
        assertThat event, starts '2014-01-01 01:01'


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
        assertThat Event({
            start: moment('2014-01-01 00:00')
            end: moment.invalid()
            durationInSeconds: 0
        }), ends '2014-01-02 00:00'
    specify 'with duration ends exactly as determined by duration' ->
        assertThat Event({
            start: moment '2014-01-01 00:00'
            end: moment.invalid()
            durationInSeconds: 60
        }), ends '2014-01-01 00:01'

