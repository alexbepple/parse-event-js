PATH := node_modules/.bin:$(PATH)

test: test-unit

test-unit:
	PATH=$(PATH) NODE_PATH=src mocha --check-leaks --recursive test --reporter mocha-unfunk-reporter

tdd: test-unit-continuously

test-unit-continuously:
	PATH=$(PATH) nodemon --exec 'make test-unit' --ext js

