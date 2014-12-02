
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

module.exports = {
    equalsCalendarDate
}
