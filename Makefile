BIN := ./node_modules/.bin
RUN_TESTS := $(BIN)/mocha --check-leaks --recursive test

.PHONY: test
test:
	NODE_PATH=src $(RUN_TESTS) --reporter mocha-unfunk-reporter

tdd: test-unit-continuously
test-unit-continuously:
	$(BIN)/nodemon --exec 'make test' --ext js

INSTRUMENTED := src-instrumented
clean-instrument-src:
	rm -rf $(INSTRUMENTED)
instrument-src: clean-instrument-src
	$(BIN)/istanbul instrument --output $(INSTRUMENTED) src
coverage: instrument-src
	ISTANBUL_REPORTERS=text-summary,lcov NODE_PATH=$(INSTRUMENTED) $(RUN_TESTS) --reporter mocha-istanbul
report-coverage-to-code-climeate: coverage
	CODECLIMATE_REPO_TOKEN=d59be1aaaba3d89a1be2a278d71cc4acd60b3e55c54aee39c3f00acf715877ff $(BIN)/codeclimate < lcov.info

