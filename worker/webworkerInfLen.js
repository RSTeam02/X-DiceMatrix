//calculate random roll length for every dice
let val = 1 + Math.floor(Math.random() * 80);
var diceAttr = {
	cnt: Math.floor(Math.random() * 6),
	finished: false
};
var timeout;

function rollLen() {    
    timeout = setTimeout("rollLen()", 50);
    diceAttr.cnt++;
    diceAttr.cnt=diceAttr.cnt%6;
    postMessage(diceAttr);
}
rollLen();