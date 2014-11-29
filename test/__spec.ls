
describe 'beNull' ->
	specify 'succeeds on null' ->
		expect null .to.beNull()
	specify 'fails on an object' ->
		expect {} .not.to.beNull()

describe 'beTrue' ->
	specify 'succeeds on true' ->
		expect true .to.beTrue()
	specify 'fails otherwise' ->
		expect false .not.to.beTrue()

describe 'beFalse' ->
	specify 'succeeds on false' ->
		expect false .to.beFalse()
	specify 'fails otherwise' ->
		expect true .not.to.beFalse()

describe 'beUndefined' ->
	specify 'succeeds on undefined' ->
		expect undefined .to.beUndefined()
	specify 'fails otherwise' ->
		expect null .not.to.beUndefined()

describe 'deep.contain' ->
	specify 'succeeds if actual contains all of expected' ->
		expect {a: {a: 1}, b: 2} .to.deep.contain {a: {a: 1}}
	specify 'fails otherwise' ->
		expect {} .not.to.deep.contain {a: 1}

describe 'shallowDeepEqual, and by extension deep.contain,' ->
	specify 'do not treat "not" flag correctly' ->
		expect {a: 1} .not.to.shallowDeepEqual {a: 1}

