'use strict';

const TAB = '\t';
global._look = ''; // lookahead char
var _text, _pos;

// Initialize.
global.init = function (s) {
    _text = s;
    _pos = 0;
    getChar();
}

// Read a new char from the input stream.
global.getChar = function () {
    _look = _text[_pos++];
}

// Report an error.
global.error = function (s) {
    writeLn();
    writeError('Error: ', s + '.');
}

// Report an error and halt.
global.abort = function (s) {
    error(s);
    process.exit(-1);
}

// Report what was expected.
global.expected = function (s) {
    abort(`'${s}' expected`);
}

// Match a specific input char.
global.match = function (x) {
    if (_look !== x)
        return expected(`'${x}'`);

    getChar();
}

global.isAddOp = function (c) {
    return ['+', '-'].includes(c);
}

// Is Alpha Character.
global.isAlpha = function (c) {
    c = c.toUpperCase();
    return (c >= 'A' && c <= 'Z');
}

// Is a decimal digit.
global.isDigit = function (c) {
    return (c >= '0' && c <= '9');
}

// Get an identifier.
global.getName = function () {
    if (!isAlpha(_look))
        expected('Name');

    var result = _look.toUpperCase();
    getChar();
    return result;
}

// Get a number.
global.getNum = function () {
    if (!isDigit(_look))
        expected('Integer');

    var result = _look;
    getChar();
    return result;
}

// Output a string with TAB and LN.
global.emitLn = function (s) {
    writeLn(TAB, s);
}

global.writeLn = function () {
    console.log.apply(console, arguments);
}

global.writeError = function () {
    console.error.apply(console, arguments);
}