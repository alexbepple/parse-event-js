require! moment

formatDateTime = (moment) ->
	moment.format 'YYYY-MM-DD HH:mm:ss'
formatCalendarDate = (moment) ->
	moment.format 'YYYY-MM-DD'

equalsMoment = (precision, format) ->
	(expected) ->
		matches: (actual) ->
			moment(expected).isSame actual, precision
		describeTo: (description) ->
			description
				.appendValue format expected
		describeMismatch: (actual, description) ->
			description
				.append 'was '
				.appendValue format actual
		getDiffItems: (actual) -> {
			expected: format expected
			actual: format actual
		}

equalsCalendarDate = equalsMoment \day, formatCalendarDate

equalsDateTime = equalsMoment null, formatDateTime


module.exports = {
	equalsCalendarDate
	equalsDateTime
}
