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

future = (dateSpec, reference, mutatedMoment) ->
    if (r.isEmpty(dateSpec) && mutatedMoment is undefined)
        return moment.invalid()

    reference = reference || moment()
    mutatedMoment = mutatedMoment || reference.clone().startOf('day')
    if (r.isEmpty(dateSpec)) then return mutatedMoment

    tokens = m.split(dateSpec)
    token = r.head(tokens)
    restOfSpec = m.join(r.tail(tokens))

    if (token.indexOf('tom') is 0)
        mutatedMoment.add(1, 'day')
        return future(restOfSpec, reference, mutatedMoment)

    if (token is 'eod') then token = '23:59'
    if (/^\d{3}$/.test(token)) then token = '0' + token
    timeComponent = moment(token, 'H:mm')
    if (!hasUnusedParsingTokens(timeComponent) && !hasUnusedInput(timeComponent))
        copy('hours', timeComponent, mutatedMoment)
        copy('minutes', timeComponent, mutatedMoment)
        if (!mutatedMoment.isAfter(reference))
            mutatedMoment.add(1, 'days')
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
    token = dateSpec

    isTime = (token) ->
        # copied code
        if (token is 'eod') then token = '23:59'
        if (/^\d{3}$/.test(token)) then token = '0' + token
        timeComponent = moment(token, 'H:mm')
        return (!hasUnusedParsingTokens(timeComponent) && !hasUnusedInput(timeComponent))

    r.some(isTime)(m.split(dateSpec))

module.exports = {
    future
    specifiesTime
}
