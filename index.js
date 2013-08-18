var stream = require('stream');
var util = require('util');

util.inherits(LineBuffer, stream.Transform);

function LineBuffer(options) {
    stream.Transform.call(this, options);
    this._readableState.objectMode = true;
    this._writableState.objectMode = true;
}

function indexOf(buffer, char) {
	for(var i = 0; i < buffer.length; i++) if(buffer[i] == char) return i;
    return -1;
}

LineBuffer.prototype._transform = function bufferLines(chunk, encoding, callback) {
    var off;
	if (typeof chunk == 'string') {
        if (this._buffer) chunk = this._buffer + chunk;
        off = chunk.indexOf("\n");
        while (off != -1) {
            this.push(chunk.slice(0, chunk.charAt(off - 1) == "\r" ? off - 1: off));
            chunk = chunk.slice(off + 1);
            off = chunk.indexOf("\n");
        }
        this._buffer = chunk;
	} else {
        if (this._buffer) chunk = Buffer.concat([this._buffer, chunk]);
        off = indexOf(chunk, "\n");
        while (off != -1) {
            this.push(chunk.slice(0, chunk[off - 1] == 13 ? off - 1 : off));
            chunk = chunk.slice(off + 1);
            off = indexOf(chunk, "\n");
        }
        this._buffer = chunk.length ? chunk : null;
    }

    callback();
}

LineBuffer.prototype._flush = function (callback) {
    this.push(this._buffer);
    this._buffer = null;
    callback();
}

module.exports = LineBuffer;

module.exports.LineBuffer = LineBuffer; // Backward compatibility
