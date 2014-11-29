require! {
    './_date_helper': {tomorrow}
}

describe 'Date helper' ->
    specify 'creates tomorrow at start of day' ->
        expect tomorrow() .to.be.date tomorrow().startOf('day')

