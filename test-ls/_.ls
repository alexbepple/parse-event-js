chai = require('chai')
chai.should()
global.expect = chai.expect

Assertion = chai.Assertion;

chai.use require('chai-shallow-deep-equal')
Assertion.addMethod 'containDeep', (tree) ->
	new Assertion(this._obj).to.shallowDeepEqual(tree)

Assertion.addMethod 'falsy', ->
	new Assertion(this._obj).to.be.false

Assertion.addMethod 'beFalse', ->
	new Assertion(this._obj).to.be.false

Assertion.addMethod('truthy', ->
	new Assertion(this._obj).to.be.true;
);
Assertion.addMethod('beTrue', ->
	new Assertion(this._obj).to.be.true;
);
Assertion.addMethod('beUndefined', ->
	new Assertion(this._obj).to.be.undefined;
);

Assertion.addMethod 'beNull', ->
	@null

