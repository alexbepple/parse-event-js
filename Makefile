bin := $(shell npm bin)
run_tests := $(bin)/mocha --check-leaks --recursive test-ls --compilers ls:LiveScript
lsc := $(bin)/lsc

build := build
src_js := $(build)/src-js

.PHONY: test
test:
	NODE_PATH=src-ls $(run_tests) --reporter mocha-unfunk-reporter
tdd:
	$(bin)/nodemon --exec 'make test' --ext ls

clean:
	rm -rf $(build)

compile-src:
	$(lsc) -bco $(src_js) src-ls

instrumented := $(build)/src-instrumented
clean-instrument-src:
	rm -rf $(instrumented)
instrument-src: clean-instrument-src
	$(bin)/istanbul instrument --output $(instrumented) $(src_js)
coverage: instrument-src
	ISTANBUL_REPORTERS=text-summary,lcov NODE_PATH=$(instrumented) $(run_tests) --reporter mocha-istanbul
report-coverage-to-code-climeate: compile-src coverage
	CODECLIMATE_REPO_TOKEN=d59be1aaaba3d89a1be2a278d71cc4acd60b3e55c54aee39c3f00acf715877ff $(bin)/codeclimate < lcov.info

