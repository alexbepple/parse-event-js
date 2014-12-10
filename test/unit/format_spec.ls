require! {
    moment
    format: {formatForAddEvent}
    '../hamjest/expect': {expect, containString}
}

describe 'Event formatter', ->
    specify 'formats title', ->
        expect formatForAddEvent {title: 'foo'} .to containString "-title 'foo'"

    specify 'formats start', ->
        expect formatForAddEvent { start: moment('2014-01-01 01:01') }
            .to containString "-start '2014-01-01 01:01'"
