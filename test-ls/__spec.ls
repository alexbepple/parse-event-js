
describe 'beNull' ->
	specify 'succeeds on null' ->
		expect null .to.beNull()
	specify 'fails on an object' ->
		expect {} .not.to.beNull()
