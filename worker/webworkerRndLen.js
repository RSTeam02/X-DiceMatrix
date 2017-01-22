//calculate random roll length for every dice
var cnt = 0;
var val = 1 + Math.floor(Math.random() * 80);
var finished = false;
var timeout;

function rollLen() {
    if (cnt !== val) {
        timeout = setTimeout("rollLen()", 20);
        cnt++;
    } else {
        clearTimeout(timeout);
        finished = true;
    }
    postMessage([cnt, finished]);
}
rollLen();