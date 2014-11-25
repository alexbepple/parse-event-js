bin := $(shell npm bin)
run_tests := $(bin)/mocha --check-leaks --recursive test
lsc := $(bin)/lsc

.PHONY: test
test: compile-src compile-test
	NODE_PATH=src $(run_tests) --reporter mocha-unfunk-reporter
continuously-test:
	$(bin)/nodemon --exec 'make test' --ext js

compile-test:
	$(lsc) -co test test-ls $(args)
continuously-compile-test:
	make compile-test args=-w

compile-src:
	$(lsc) -co src src-ls $(args)
continuously-compile-src:
	make compile-src args=-w

tdd: compile-src
	bundle exec foreman start -f Procfile.tdd

INSTRUMENTED := src-instrumented
clean-instrument-src:
	rm -rf $(INSTRUMENTED)
instrument-src: clean-instrument-src
	$(bin)/istanbul instrument --output $(INSTRUMENTED) src
coverage: instrument-src
	ISTANBUL_REPORTERS=text-summary,lcov NODE_PATH=$(INSTRUMENTED) $(run_tests) --reporter mocha-istanbul
report-coverage-to-code-climeate: coverage
	CODECLIMATE_REPO_TOKEN=d59be1aaaba3d89a1be2a278d71cc4acd60b3e55c54aee39c3f00acf715877ff $(bin)/codeclimate < lcov.info

