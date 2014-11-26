chai = require('chai')
chai.should()
global.expect = chai.expect

Assertion = chai.Assertion;

chai.use require('chai-shallow-deep-equal')
Assertion.addMethod 'containDeep', (tree) ->
	@shallowDeepEqual(tree)

Assertion.addMethod 'beFalse', ->
	@false

Assertion.addMethod 'beTrue', ->
	@true

Assertion.addMethod 'beUndefined', ->
	@undefined

Assertion.addMethod 'beNull', ->
	@null

