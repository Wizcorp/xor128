#include <stdint.h>


/**
 * XOR128 pseudo-random number generator. This is based off of algorithm found on the XORSHIFT wiki here:
 * http://en.wikipedia.org/wiki/Xorshift.
 */
class XOR128 {
public:
	uint32_t x;
	uint32_t y;
	uint32_t z;
	uint32_t w;

	XOR128(uint32_t x, uint32_t y, uint32_t z, uint32_t w);

	// Returns the next unsigned 32bit integer in the sequence
	uint32_t next();

	// Returns the next number in the sequence as a float value between 0 & 1
	double random();
};