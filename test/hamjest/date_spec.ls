require! {
    moment
    './expect': {expect, haveSize}
    './date_expect': {equalCalendarDate, equalDateTime}
}

describe 'equalCalendarDate' ->
    specify 'matches same moment' ->
        now = moment()
        expect now .to equalCalendarDate now

    specify 'disregards time' ->
        someTimeToday = moment().hour(1)
        anotherTimeToday = someTimeToday.clone().hour(2)
        expect someTimeToday .to equalCalendarDate anotherTimeToday


describe 'equalDateTime' ->
    specify 'matches same moment' ->
        now = moment()
        expect now .to equalDateTime now

    specify 'matches same moment provided as Date' ->
        now = moment().toDate()
        expect now .to equalDateTime now

    specify 'does not match moment with differing seconds' ->
        midnight = moment '2015-01-01 00:00:00'
        oneSecondAfterMidnight = moment '2015-01-01 00:00:01'
        expect midnight .to.not equalDateTime oneSecondAfterMidnight

