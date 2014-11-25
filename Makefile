bin := $(shell npm bin)
run_tests := $(bin)/mocha --check-leaks --recursive test
lsc := $(bin)/lsc

run-tests:
	NODE_PATH=src $(run_tests) --reporter mocha-unfunk-reporter
continuously-run-tests:
	$(bin)/nodemon --exec 'make run-tests' --ext js

clean-test:
	rm -rf test
compile-test:
	mkdir -p test
	cp -R test-js/* test
	$(lsc) -co test test-ls $(args)
continuously-compile-test:
	make compile-test args=-w

clean-src:
	rm -rf src
compile-src:
	mkdir -p src
	cp -R src-js/* src
	$(lsc) -co src src-ls $(args)
continuously-compile-src:
	make compile-src args=-w

clean: clean-test clean-src
compile: compile-test compile-src

.PHONY: test
test: clean compile run-tests
tdd: clean compile
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

