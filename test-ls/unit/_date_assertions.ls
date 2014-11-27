require! {
    moment
    chai: {Assertion}
}

formatDate = (dateSpec) ->
    if (dateSpec === undefined) then return dateSpec
    moment(dateSpec).format('YYYY-MM-DD HH:mm')


Assertion.addMethod 'future' ->
    actual = this._obj
    this.assert(
        moment(actual).isAfter moment()
        'expected #{act} to be in the future'
        'expected #{act} not to be in the future'
        null
        formatDate actual
    )

Assertion.addMethod 'after', (momentOrDateOrDateSpec) ->
    actual = this._obj
    this.assert(
        moment(actual).isAfter moment(momentOrDateOrDateSpec)
        'expected #{act} to be after #{exp}'
        'expected #{act} not to be after #{exp}'
        formatDate momentOrDateOrDateSpec
        formatDate actual
    )

Assertion.addMethod 'valid' ->
    actual = this._obj
    myMoment = moment(this._obj)
    this.assert(
        moment(actual).isValid()
        'expected #{act} to be valid'
        'expected #{act} not to be valid'
        null
        formatDate actual
    )

Assertion.addMethod 'date', (dateOrDateAsString) ->
    actual = this._obj
    this.assert(
        moment(actual).isSame moment(dateOrDateAsString)
        'expected #{act} to be #{exp}'
        'expected #{act} not to be #{exp}'
        formatDate dateOrDateAsString
        formatDate actual
    )

module.exports = {
    formatDate
}

