require! {
    moment
    ramda: r
    './misc': {split, join}:m
}

toLowerCase = r.map(r.func('toLowerCase'))
allMonths = r.concat(moment.months(), moment.monthsShort())
allMonthsInLowerCase = toLowerCase(allMonths)
isMonth = (dateSpec) -> r.contains(dateSpec.toLowerCase())(allMonthsInLowerCase)

allWeekdays = r.concat(moment.weekdays(), moment.weekdaysShort())
allWeekdaysInLowerCase = toLowerCase(allWeekdays)
isWeekday = (dateSpec) -> r.contains(dateSpec.toLowerCase())(allWeekdaysInLowerCase)

hasUnusedInput = (moment) -> !r.isEmpty(moment.parsingFlags().unusedInput)
hasUnusedParsingTokens = (moment) -> !r.isEmpty(moment.parsingFlags().unusedTokens)

copy = (unit, from, to) ->
    unitAccessor = r.func(unit)
    unitAccessor(to, unitAccessor(from))


time = {
    parse: (token) ->
        if (token is 'eod') then token = '23:59'
        if (/^\d{3}$/.test(token)) then token = '0' + token
        moment(token, 'H:mm')
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
}
tomorrow = {
    parse: -> it
    isValid: -> (it.indexOf \tom) is 0
    apply: (_, sinkMoment) -> sinkMoment.add 1 \day
}
month = {
    parse: -> it
    isValid: isMonth
    apply: (parseResult, sinkMoment) ->
        sinkMoment.month(parseResult)
    cycle: 'year'
}
weekday = {
    parse: -> it
    isValid: isWeekday
    apply: (parseResult, sinkMoment) ->
        sinkMoment.day(parseResult)
    cycle: 'week'
}

future = (dateSpec, reference, mutatedMoment) ->
    if (r.isEmpty(dateSpec) && mutatedMoment is undefined)
        return moment.invalid()
    if r.isEmpty(dateSpec) then return mutatedMoment

    reference = reference || moment()
    mutatedMoment = mutatedMoment || reference.clone().startOf \day

    [token, ...rest] = split dateSpec
    restOfSpec = join rest

    findComponent = r.find -> it.parse token |> it.isValid
    component = findComponent [tomorrow, time, dayOfMonth, month, weekday]
    if component
        component.apply (component.parse token), mutatedMoment
        if !mutatedMoment.isAfter reference then mutatedMoment.add 1, component.cycle
        return future restOfSpec, reference, mutatedMoment

    return moment.invalid()

specifiesTime = (dateSpec) ->
    isTime = r.pipe time.parse, time.isValid
    m.split dateSpec |> r.some isTime

module.exports = {
    future
    specifiesTime
}
