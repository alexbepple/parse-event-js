require! {
    moment
    event: Event
    hamjest: {assertThat}
    './event': {starts, ends}
}

describe '#starts' ->
    specify 'matches event start' ->
        aMoment = moment()
        assertThat Event({start: aMoment}), starts aMoment

describe '#ends' ->
    specify 'matches event end' ->
        aMoment = moment()
        assertThat Event({start: moment.invalid(), end: aMoment}),
            ends aMoment
