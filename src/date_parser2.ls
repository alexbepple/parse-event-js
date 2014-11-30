require! {
    moment
    ramda: {head, tail}:r
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
    isValid: (timeComponent) ->
        !hasUnusedParsingTokens(timeComponent) && !hasUnusedInput(timeComponent)
    setFuture: (time, reference, mutatedMoment) ->
        copy('hours', time, mutatedMoment)
        copy('minutes', time, mutatedMoment)
        if !mutatedMoment.isAfter(reference)
            mutatedMoment.add(1, 'day')
}
dayOfMonth = {
    parse: (token) ->
        moment(token, 'D')
    isValid: (date) ->
        date.isValid() && !hasUnusedInput(date)
    setFuture: (date, reference, mutatedMoment) ->
        copy('date', date, mutatedMoment)
        if (!mutatedMoment.isAfter(reference))
            mutatedMoment.add(1, 'month')
}
tomorrow = {
    parse: -> it
    isValid: -> (it.indexOf \tom) is 0
    setFuture: (_, __, sink) ->
        sink.add 1 \day
}

future = (dateSpec, reference, mutatedMoment) ->
    if (r.isEmpty(dateSpec) && mutatedMoment is undefined)
        return moment.invalid()
    if r.isEmpty(dateSpec) then return mutatedMoment

    reference = reference || moment()
    mutatedMoment = mutatedMoment || reference.clone().startOf \day

    dateSpecTokens = split dateSpec
    token = head dateSpecTokens
    restOfSpec = tail dateSpecTokens |> join

    findComponent = r.find -> it.parse token |> it.isValid
    component = findComponent [tomorrow, time, dayOfMonth]
    if component
        component.setFuture (component.parse token), reference, mutatedMoment
        return future restOfSpec, reference, mutatedMoment

    if isMonth token
        mutatedMoment.month(token)
        if (!mutatedMoment.isAfter(reference))
            mutatedMoment.add(1, 'year')
        return future(restOfSpec, reference, mutatedMoment)

    if isWeekday token
        mutatedMoment.day(token)
        if (!mutatedMoment.isAfter(reference))
            mutatedMoment.add(7, 'days')
        return future(restOfSpec, reference, mutatedMoment)

    return moment.invalid()

specifiesTime = (dateSpec) ->
    isTime = r.pipe time.parse, time.isValid
    m.split dateSpec |> r.some isTime

module.exports = {
    future
    specifiesTime
}
