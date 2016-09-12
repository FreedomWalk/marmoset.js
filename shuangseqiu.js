/**
 * Created by jiangyun on 16/9/12.
 */

var redBallArray = [];
while (redBallArray.length <= 6) {
    var red = getRandomNumber(1, 33);
    if (!contain(red, redBallArray)) {
        redBallArray.push(red);
    }
}
var blueBall = getRandomNumber(1, 16);

console.log('红球:', redBallArray.sort(sortNumber));
console.log('篮球:', blueBall);


function getRandomNumber(under, over) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * under + 1, 0);
        case 2:
            return parseInt(Math.random() * (over - under + 1) + under, 0);
        default:
            return 0;
    }
}

function contain(n, a) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === n) {
            return true;
        }
    }
    return false;
}

function sortNumber(a, b) {
    return a - b;
}
