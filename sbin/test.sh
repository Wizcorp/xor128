#!/bin/bash

# Set strict options
set -o errexit
set -o nounset


# Get project directory
PROJECTDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)";


# Test the generator for 100 iterations
SEEDX="3520266979";
SEEDY="893267549";
SEEDZ="3738293405";
SEEDW="3096136551";

for ITERATION in $(seq 0 99);
do
	echo "Testing iteration ${ITERATION}";

	RESULT_CPP="$(${PROJECTDIR}/sample/c++/xor128Sample ${SEEDX} ${SEEDY} ${SEEDZ} ${SEEDW} ${ITERATION} 1)";
	RESULT_JS="$(node ${PROJECTDIR}/sample/js/index.js ${SEEDX} ${SEEDY} ${SEEDZ} ${SEEDW} ${ITERATION} 1)";

	if [ "${RESULT_CPP}" != "${RESULT_JS}" ]; then
		echo "Inconsistency found for iteration ${ITERATION} when using seed: ${SEEDX} ${SEEDY} ${SEEDZ} ${SEEDW}" >&2;
		exit 1;
	fi
done

echo "Test Passed!"