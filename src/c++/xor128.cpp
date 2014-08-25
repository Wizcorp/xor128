#include "xor128.h"


XOR128::XOR128(uint32_t x, uint32_t y, uint32_t z, uint32_t w) {
	this->x = x;
	this->y = y;
	this->z = z;
	this->w = w;
}


/**
 * Returns the next unsigned 32bit integer in the sequence
 */
uint32_t XOR128::next() {
	uint32_t t = this->x ^ (this->x << 11);

	this->x = this->y;
	this->y = this->z;
	this->z = this->w;
	this->w = this->w ^ (this->w >> 19) ^ (t ^ (t >> 8));

	return this->w;
}


/**
 * Returns the next number in the sequence as a float value between 0 & 1
 */
double XOR128::random() {
	return ((double)this->next()) / 4294967296;
}