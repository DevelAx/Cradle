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
    let value = cr.getNum();

    while (next) {
        switch (_look) {
            case '*':
                cr.match('*');
                value *= cr.getNum();
                break;
            case '/':
                cr.match('/');
                value /= cr.getNum();
                break;
            default:
                next = false;
                break;
        }
    }

    return value;
}



cr.init(`11/33+22/33`);

cr.writeLn(expression());

// if (_look !== '\n')
//     cr.expected("New line");

// https://www.asm80.com/