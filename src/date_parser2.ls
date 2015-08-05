require! {
    moment
    ramda: r
    './misc': {split, join}:m
}

toLowerCase = r.map(r.toLower)

hasUnusedInput = (moment) -> !r.isEmpty(moment.parsingFlags().unusedInput)
hasUnusedParsingTokens = (moment) -> !r.isEmpty(moment.parsingFlags().unusedTokens)

copy = (unit, source, sink) ->
    sourceValue = r.invoke(unit, [], source)
    r.invoke(unit, [sourceValue], sink)

time = {
    parse: (token) ->
        parseTime = (token) ->
            if (token is 'eod')        then return parseTime '23:59'
            if (/^\d{3}$/.test(token)) then return parseTime '0' + token
            if token.length <= 2       then return parseTime token + '00'
            moment(token, 'H:mm')

        parseTime token
    isValid: -> !hasUnusedParsingTokens(it) && !hasUnusedInput(it)
    apply: (sourceMoment, sinkMoment) ->
        copy('hours', sourceMoment, sinkMoment)
        copy('minutes', sourceMoment, sinkMoment)
    cycle: 'day'
}
dayOfMonth = {
    parse: -> moment it, 'D'
    isValid: -> it.isValid() && !hasUnusedInput it
    apply: (sourceMoment, sinkMoment) ->
        copy('date', sourceMoment, sinkMoment)
    cycle: 'month'
    scope: ['day']
}
tomorrow = {
    parse: -> it
    isValid: -> (it.indexOf \tom) is 0
    apply: (_, sinkMoment) -> sinkMoment.add 1 \day
    scope: ['day']
}

allMonths = r.concat(moment.months(), moment.monthsShort())
allMonthsInLowerCase = toLowerCase(allMonths)
isMonth = (dateSpec) -> r.contains(dateSpec.toLowerCase())(allMonthsInLowerCase)
month = {
    parse: -> it
    isValid: isMonth
    apply: (parseResult, sinkMoment) ->
        sinkMoment.month(parseResult)
    cycle: 'year'
}

allWeekdays = r.concat(moment.weekdays(), moment.weekdaysShort())
allWeekdaysInLowerCase = toLowerCase(allWeekdays)
isWeekday = (dateSpec) -> r.contains(dateSpec.toLowerCase())(allWeekdaysInLowerCase)
weekday = {
    parse: -> it
    isValid: isWeekday
    apply: (parseResult, sinkMoment) ->
        sinkMoment.day(parseResult)
    cycle: 'week'
    scope: ['day']
}

fallback = {
    parse: ->
    isValid: -> true
    apply: -> moment.invalid()
}

startingComponents = (options) ->
    if options.findTimeFirst
        return [time, tomorrow, dayOfMonth, month, weekday, fallback]
    return [tomorrow, dayOfMonth, month, weekday, time, fallback]

future = (dateSpec, reference, options={}, accumulated, components) ->
    if (r.isEmpty(dateSpec) && accumulated is undefined)
        return moment.invalid()
    if r.isEmpty(dateSpec) then return accumulated

    reference = reference || moment()
    accumulated = accumulated || reference.clone().startOf \day
    components = components || startingComponents(options)

    [token, ...rest] = split dateSpec
    restOfSpec = join rest

    componentMatches = -> it.parse token |> it.isValid
    component = r.find componentMatches, components
    accumulated = component.apply (component.parse token), accumulated
    if !accumulated.isAfter reference then accumulated.add 1, component.cycle

    satisfiedScope = component.scope || []
    componentHasRelevantScope = ->
        scope = it.scope || []
        r.isEmpty r.intersection satisfiedScope, scope
    components = r.filter componentHasRelevantScope, components

    return future restOfSpec, reference, options, accumulated, components


module.exports = {
    future
}
