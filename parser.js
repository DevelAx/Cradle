const cr = require("./cradle");


function expression() {
    let value = 0, next = true;

    if (!cr.isAddOp(_look))
        value = term();

    while (next) {
        switch (_look) {
            case '+':
                cr.match('+');
                value += term();
                break;
            case '-':
                cr.match('-');
                value -= term();
                break;
            default:
                next = false;
                break;
        }
    }

    return value;
}

function term() {
    let next = true;
    let value = factor();

    while (next) {
        switch (_look) {
            case '*':
                cr.match('*');
                value *= factor();
                break;
            case '/':
                cr.match('/');
                value /= factor();
                break;
            default:
                next = false;
                break;
        }
    }

    return value;
}

function factor(){
    if (_look==='('){
        cr.match('(');
        var result = expression();
        cr.match(')');
    }
    else{
        result = cr.getNum();
    }

    return result;
}



cr.init(`11/(33+22)/33`);

cr.writeLn(expression());

// if (_look !== '\n')
//     cr.expected("New line");

// https://www.asm80.com/