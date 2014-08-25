##
# xor128 project Makefile
# description     : Makefile to install this project and its dependencies along with other helpers
# author          : Almir Kadric
# created on      : 2014-08-25
##


##
# Global variables
##

# Set default shell
SHELL = /bin/bash

# Function for help
define helpText

######################################
###             XOR128             ###
######################################

make cpp             Build C++ sample code
make dev             Install & setup project & development dependencies

make test            Runs all tests (shortcut for test-lint & test-unit)
make test-lint       Lint the entire project
make test-unit       Run unit test script ./sbin/test.sh

endef
export helpText


##
# Make Targets
##

# List of target which should be run every time without caching
.PHONY: cpp dev test test-lint


# Default make target
%::
	@echo "$$helpText"
Default :
	@echo "$$helpText"


# Compile C++ sample code
cpp :
	gcc -lstdc++ -I./src/c++ ./src/c++/xor128.cpp ./sample/c++/main.cpp -o ./sample/c++/xor128Sample

# Dev target
dev :
	npm install
	./sbin/lint.sh setup

# Test all
test : test-lint test-unit

# Lint target
test-lint :
	./sbin/lint.sh ${lintFilter}

# Test using generator samples
test-unit : cpp
	./sbin/test.sh