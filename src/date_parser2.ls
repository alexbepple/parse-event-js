require! {
    moment
    ramda:r
    './misc':m
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


parseTime = (token) ->
    if (token is 'eod') then token = '23:59'
    if (/^\d{3}$/.test(token)) then token = '0' + token
    moment(token, 'H:mm')
isValidTime = (timeComponent) ->
    !hasUnusedParsingTokens(timeComponent) && !hasUnusedInput(timeComponent)
setFutureTime = (time, reference, mutatedMoment) ->
    copy('hours', time, mutatedMoment)
    copy('minutes', time, mutatedMoment)
    if !mutatedMoment.isAfter(reference)
        mutatedMoment.add(1, 'day')


future = (dateSpec, reference, mutatedMoment) ->
    if (r.isEmpty(dateSpec) && mutatedMoment is undefined)
        return moment.invalid()
    if r.isEmpty(dateSpec) then return mutatedMoment

    reference = reference || moment()
    mutatedMoment = mutatedMoment || reference.clone().startOf('day')

    tokens = m.split(dateSpec)
    token = r.head(tokens)
    restOfSpec = m.join(r.tail(tokens))

    if (token.indexOf('tom') is 0)
        mutatedMoment.add(1, 'day')
        return future(restOfSpec, reference, mutatedMoment)

    parsedTime = parseTime token
    if isValidTime parsedTime
        setFutureTime parsedTime, reference, mutatedMoment
        return future(restOfSpec, reference, mutatedMoment)

    date = moment(token, 'D')
    if (date.isValid() && !hasUnusedInput(date))
        copy('date', date, mutatedMoment)
        if (!mutatedMoment.isAfter(reference))
            mutatedMoment.add(1, 'month')
        return future(restOfSpec, reference, mutatedMoment)

    if (isMonth(token))
        mutatedMoment.month(token)
        if (!mutatedMoment.isAfter(reference))
            mutatedMoment.add(1, 'year')
        return future(restOfSpec, reference, mutatedMoment)

    if (isWeekday(token))
        mutatedMoment.day(token)
        if (!mutatedMoment.isAfter(reference))
            mutatedMoment.add(7, 'days')
        return future(restOfSpec, reference, mutatedMoment)

    return moment.invalid()

specifiesTime = (dateSpec) ->
    isTime = r.pipe parseTime, isValidTime
    m.split dateSpec |> r.some isTime

module.exports = {
    future
    specifiesTime
}
