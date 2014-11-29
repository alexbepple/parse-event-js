require! {
    moment
    './_date_assertions': {formatDate}
}

describe 'Date assertions' ->
    specify 'format dates in an easily readable fashion' ->
        formatted = formatDate moment '2014-11-05 13:00'
        expect formatted .to.equal '2014-11-05 13:00'

    specify "format 'undefined' as such" ->
        expect(formatDate(undefined)).to.beUndefined()

