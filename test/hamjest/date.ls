require! moment

format = (moment) ->
    moment.format 'YYYY-MM-DD'

equalsCalendarDate = (expected) ->
    matches: (actual) ->
        expected.isSame actual, 'day'
    describeTo: (description) ->
        description
            .append '    '
            .appendValue format expected
    describeMismatch: (actual, description) ->
        description
            .append 'was '
            .appendValue format actual

equalsDateTime = (expected) ->
    matches: (actual) ->
        moment(expected).isSame actual
    describeTo: (description) ->
        description.appendValue expected
    describeMismatch: (actual, description) ->
        description.appendValue actual


module.exports = {
    equalsCalendarDate
    equalsDateTime
}
