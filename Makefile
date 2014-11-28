bin := $(shell npm bin)
run_tests := $(bin)/mocha --check-leaks --recursive test-ls --compilers ls:LiveScript
lsc := $(bin)/lsc

run-tests:
	NODE_PATH=src $(run_tests) --reporter mocha-unfunk-reporter
continuously-run-tests:
	$(bin)/nodemon --exec 'make run-tests' --ext js,ls --watch src/ --watch test-ls/

clean-src:
	rm -rf src
copy-src-js:
	mkdir -p src
	cp -R src-js/* src
continuously-copy-src-js:
	$(bin)/nodemon --exec 'make copy-src-js' --watch src-js/
compile-src-ls:
	mkdir -p src
	$(lsc) -bco src src-ls $(args)
continuously-compile-src-ls:
	make compile-src-ls args=-w
assemble-src: copy-src-js compile-src-ls

clean: clean-src
assemble: assemble-src

.PHONY: test
test: clean assemble run-tests
tdd: clean assemble
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

