var q = require('parse');

describe('Date parser', function() {
    it('assumes an all-day event when no time is given', function() {
        expect(q.parse('foo')).to.be.allDay();
    });

    it('translates duration to seconds', function() {
        expect(q.parse('1h').durationInSeconds).to.equal(3600);
    });

    describe('detects end dates', function() {
        it('as times', function() {
            q.parse('to 0:01').should.end(Date.future('0:01'));
        });
        it('as more complex dates', function() {
            q.parse('to Tuesday 0:01').should.end(Date.future('Tuesday 0:01'));
        });
    });
    describe('excludes end dates from title', function () {
        it('', function() {
            q.parse('to 0:01').title.should.equal('');
        });
        it('but preserves title when there is no end date', function() {
            q.parse('foo').title.should.equal('foo');
        });
    });
});
