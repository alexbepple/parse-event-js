require! {
    duration_detector: {detectDuration}
    '../hamjest/expect': {expect, contain}
}

describe 'Duration detector' ->
    specify 'returns duration in seconds and unprocessed tail' ->
        expect (detectDuration '1s foo') .to contain {durationInSeconds: 1, tail: 'foo'}
    specify 'returns zero duration and input as tail when it cannot detect a duration' ->
        expect detectDuration 'foo' .to contain {durationInSeconds: 0, tail: 'foo'}
