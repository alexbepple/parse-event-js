var exec = require('child_process').exec;

describe('parseEvent binary', function () {
	it('exits with error code 0', function (done) {
		var parseEvent = '/usr/bin/env node $HOME/engagements/calfred/parseEvent/src/parseEvent.js ""';
		exec(parseEvent, function (error) {
			expect(error).to.beNull(error);
			done();
		});
	});
});
