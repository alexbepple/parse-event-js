require! {
    moment
    './expect': {expect}
    './date_expect': {equalCalendarDate}
    hamjest
}

describe 'equalDate' ->
    specify 'matches same moment' ->
        now = moment()
        expect now .to equalCalendarDate now
    specify 'disregards time' ->
        someTimeToday = moment().hour(1)
        anotherTimeToday = someTimeToday.clone().hour(2)
        expect someTimeToday .to equalCalendarDate anotherTimeToday

