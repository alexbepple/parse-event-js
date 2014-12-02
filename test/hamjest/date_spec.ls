require! {
    moment
    './expect': {expect, haveSize}
    './date_expect': {equalCalendarDate}
}

describe 'equalCalendarDate' ->
    specify 'matches same moment' ->
        now = moment()
        expect now .to equalCalendarDate now

    specify 'disregards time' ->
        someTimeToday = moment().hour(1)
        anotherTimeToday = someTimeToday.clone().hour(2)
        expect someTimeToday .to equalCalendarDate anotherTimeToday

    specify 'pads description of expected to match length of actual description for easier comparison' ->
        aMoment = moment()
        expectedDescription = newDescription()
        actualDescription = newDescription()

        equalCalendarDate(aMoment).describeTo expectedDescription
        equalCalendarDate(null).describeMismatch aMoment, actualDescription

        expect expectedDescription.result()
            .to haveSize actualDescription.result().length


newDescription = ->
    result = ''
    append = (text) -> result += text; this
    {
        append
        appendValue: append
        result: -> result
    }

