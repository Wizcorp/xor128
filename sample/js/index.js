var xor128 = require('xor128');


function helpScreen(message) {
	console.error(message, process.argv.join(' '));
	console.log("Usage:", process.argv[0], process.argv[1], "seedX seedY seedZ seedW offset count");
}


function isUInt(s)
{
	return !!s.match(/^[0-9]+$/);
}


// Ensure arguments are valid
if (
	process.argv.length !== 8 ||
	!isUInt(process.argv[2]) ||
	!isUInt(process.argv[3]) ||
	!isUInt(process.argv[4]) ||
	!isUInt(process.argv[5]) ||
	!isUInt(process.argv[6]) ||
	!isUInt(process.argv[7])
) {
	helpScreen("Invalid arguments:");
	process.exit(1);
}

// Initialize generator
var generator = new xor128(parseInt(process.argv[2]), parseInt(process.argv[3]), parseInt(process.argv[4]), parseInt(process.argv[5]));


// Generate *count* numbers and print them
var offset = parseInt(process.argv[6]);
var count = parseInt(process.argv[7]);

for (var i = 0; i < offset; i += 1) {
	generator.next();
}

for (var i = 0; i < count; i += 1) {
	var sequenceI = generator.next();
	console.log(sequenceI);
}