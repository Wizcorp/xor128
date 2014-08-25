/**
 * XOR128 pseudo-random number generator. This is based off of algorithm found on the XORSHIFT wiki here:
 * http://en.wikipedia.org/wiki/Xorshift. Also the code ensures all numbers are handled as unsigned 32bit integers and
 * is consistent with the C++ example provided xor128.cpp
 *
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 * @param {Number} w
 * @returns {SeededRandomNumber}
 */
function XOR128(x, y, z, w) {
    if ((x && x < 1) || (y && y < 1) || (z && z < 1) || (w && w < 1)) {
        throw new Error('Invalid Seed');
    }

	this.x = x ? x : Math.random() * 4294967296;
	this.y = y ? y : Math.random() * 4294967296;
	this.z = z ? z : Math.random() * 4294967296;
	this.w = w ? w : Math.random() * 4294967296;
}

module.exports = XOR128;


/**
 * Returns the next unsigned 32bit integer in the sequence
 *
 * @returns {Number}
 */
XOR128.prototype.next = function () {
	var t = this.x ^ ((this.x << 11) >>> 0);

	this.x = this.y;
	this.y = this.z;
	this.z = this.w;
	this.w = (this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8))) >>> 0;

	return this.w;
};


/**
 * Returns the next number in the sequence as a float value between 0 & 1
 *
 * @returns {Number}
 */
XOR128.prototype.random = function () {
	return this.next() / 4294967296;
};


/**
 * Draws noise graph onto a given canvas object
 *
 * @param {type} canvas
 * @param {type} width
 * @param {type} height
 * @returns {undefined}
 */
XOR128.prototype.drawCanvas = function (canvas, width, height) {
	var context = canvas.getContext('2d');

	function drawPixel(x, y, r, g, b) {
		context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + 1 + ')';
		context.fillRect(x, y, 1, 1);
	}

	for (var y = 0; y < height; y += 1) {
		for (var x = 0; x < width; x += 1) {
			var color = this.next();
			drawPixel(x, y, color & 0xFF, (color >> 8) & 0xFF, (color >> 16) & 0xFF);
		}
	}
};