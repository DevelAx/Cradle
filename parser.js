require("./cradle");



function other() {
    emitLn(getName());
}

function block(){
    while (!'e'.includes(_look)){
        other();
    }
}


/*
<program> ::= <block> END
<block> ::= [ <statement> ]*
 */
function doProgram() {
    block();

    if (_look !== 'e')
        expected('End');

    emitLn('END');
}

init('e');
doProgram();


// cr.init(`-1-(2+3)*5*a+x()
// `);
// expression();

// if (_look !== '\n')
//     cr.expected("New line");

// https://www.asm80.com/