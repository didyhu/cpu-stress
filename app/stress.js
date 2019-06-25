const bigInt = require('big-integer')

"use strict"

async function fib(n) {
    let a = bigInt(0), b = bigInt(1)
    while (n > 0) {
        let c = a.add(b)
        a = b
        b = c
        n--
    }
}

function randInt(min, max) {
    return Math.floor(Math.random() * (1 + max - min)) + min
}

Promise.resolve().then(async () => {
    while (true) {
        const n = randInt(1000, 100000)
        await fib(n)
    }
})