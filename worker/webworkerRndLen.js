//calculate random roll length for every dice
let val = 1 + Math.floor(Math.random() * 80);
let counter = 0;
var diceAttr = {
	cnt: Math.floor(Math.random() * 6),
	finished: false
};
var timeout;

function rollLen() {
    if (counter !== val) {
        timeout = setTimeout("rollLen()", 50);
        counter++;
        diceAttr.cnt=counter%6;
    } else {        
        diceAttr.finished = true;
        counter=0;
        clearTimeout(timeout);
    }
    postMessage(diceAttr);
}
rollLen();