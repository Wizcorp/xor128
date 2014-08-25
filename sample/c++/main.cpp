#include <stdlib.h>
#include <iostream>
#include <stdint.h>
#include <string>
#include <xor128.h>


void helpScreen(std::string message, int argc, char *argv[]) {
	std::string fullCommand = "";
	for (int i = 0; i < argc; i += 1) {
		if (i != 0) {
			fullCommand += " ";
		}

		fullCommand += argv[i];
	}

	std::cout << message << fullCommand << std::endl;
	std::cout << "Usage: " << argv[0] << " seedX seedY seedZ seedW offset count" << std::endl;
}

bool isUInt(const std::string& s)
{
	return !s.empty() && s.find_first_not_of("0123456789") == std::string::npos;
}

int main(int argc, char *argv[]) {
	// Ensure arguments are valid
	if (
		argc != 7 ||
		!isUInt(argv[1]) ||
		!isUInt(argv[2]) ||
		!isUInt(argv[3]) ||
		!isUInt(argv[4]) ||
		!isUInt(argv[5]) ||
		!isUInt(argv[6])
	) {
		helpScreen("Invalid arguments: ", argc, argv);
		return 1;
	}


	// Initialize generator
	XOR128 generator(atoi(argv[1]), atoi(argv[2]), atoi(argv[3]), atoi(argv[4]));


	// Generate *count* numbers and print them
	int offset = atoi(argv[5]);
	int count = atoi(argv[6]);

	for (int i = 0; i < offset; i += 1) {
		generator.next();
	}

	for (int i = 0; i < count; i += 1) {
		uint32_t sequenceI = generator.next();
		std::cout << sequenceI << std::endl;
	}


	return 0;
}