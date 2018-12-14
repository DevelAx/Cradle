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
    skipWhite();
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
    skipWhite();   
}

// Get an identifier.
function getName() {
    var token = '';

    if (!isAlpha(_look))
        expected('Name');

    while(isAlNum(_look)){
        token += _look.toUpperCase();
        getChar();
    }

    skipWhite();
    return token;
}

// Get a number.
function getNum() {
    var val = '';

    if (!isDigit(_look))
        expected('Integer');

    while(isDigit(_look)){
        val += _look;
        getChar();
    }
    
    skipWhite();
    return val;
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

function isAlNum(c){
    return isAlpha(c) || isDigit(c);
}

function isWhite(c){
    return c === ' ' || c === '\t';
}

function skipWhite(){
    while(isWhite(_look))
        getChar();
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