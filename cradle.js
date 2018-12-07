'use strict';

const TAB = '\t';
global._look = ''; // lookahead char
var _text, _pos;

module.exports = {
    init,
    getChar,
    error,
    abort,
    expected,
    match,
    isAddOp,
    isAlpha,
    isDigit,
    getName,
    getNum,
    emitLn
}

// Initialize.
function init(s) {
    _text = s;
    _pos = 0;
    getChar();
}

// Read a new char from the input stream.
function getChar() {
    _look = _text[_pos++];
}

// Report an error.
function error(s) {
    writeLn();
    writeError('Error: ', s + '.');
}

// Report an error and halt.
function abort(s) {
    error(s);
    process.exit(-1);
}

// Report what was expected.
function expected(s) {
    abort(`'${s}' expected`);
}

// Match a specific input char.
function match(x) {
    if (_look !== x)
        return expected(`'${x}'`);
    
    getChar();    
}

function isAddOp(c){
    return ['+', '-'].includes(c);
}

// Is Alpha Character.
function isAlpha(c) {
    c = c.toUpperCase();
    return (c >= 'A' && c <= 'Z');
}

// Is a decimal digit.
function isDigit(c) {
    return (c >= '0' && c <= '9');
}

// Get an identifier.
function getName() {
    if (!isAlpha(_look))
        expected('Name');

    var result = _look.toUpperCase();
    getChar();
    return result;
}

// Get a number.
function getNum() {
    if (!isDigit(_look))
        expected('Integer');

    var result = _look;
    getChar();
    return result;
}

// Output a string with TAB and LN.
function emitLn(s) {
    writeLn(TAB, s);
}

function writeLn() {
    console.log.apply(console, arguments);
}

function writeError() {
    console.error.apply(console, arguments);
}