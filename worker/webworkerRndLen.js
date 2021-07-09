//calculate random roll length for every dice
let val = 1 + Math.floor(Math.random() * 80);
let counter = 1 + Math.floor(Math.random() * 80);
var diceAttr = {
	cnt: 0,
	finished: false
};
var timeout;

function rollLen() {
    if (counter !== val) {
        timeout = setTimeout("rollLen()", 75);
        counter=(counter+1)%81;        
        diceAttr.cnt=counter%6;
    } else {        
        diceAttr.finished = true;
        counter=0;
        clearTimeout(timeout);
    }
    postMessage(diceAttr);
}
rollLen();