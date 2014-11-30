require! {
    moment
    './misc': {join}
}

formatDate = (date) ->
    if not date then return ''
    moment(date).format 'YYYY-MM-DD HH:mm'

formatForAddEvent = (event) ->
    parameters =
        "-start '#{formatDate(event.start)}'"
        "-end '#{formatDate(event.end)}'"
        "-allDay", event.isAllDay
        "-title '#{event.title}'"
    join parameters

module.exports = {
    formatForAddEvent
}

