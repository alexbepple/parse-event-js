require! {
    misc: {split}
    hamjest: {assertThat, equalTo}
}

describe '#split' ->
    specify 'returns empty array for an empty string' ->
        assertThat split(''), equalTo []
