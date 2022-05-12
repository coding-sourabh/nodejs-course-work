// If test function throws an error it is treated as failure but if not throws any error then tes is success

const {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
} = require("../src/math");


test('Should calculate total with tip', () => {
    const total = calculateTip(10, .5);
    expect(total).toBe(15);
})


test('Should calculate total with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
})


test('Should convert farenheit to celsius', () => {
    const temp = fahrenheitToCelsius(32);
    expect(temp).toBe(0);
})

test('Shoule convert celsius to farenheit', () => {
    const temp = celsiusToFahrenheit(0);
    expect(temp).toBe(32);
})


// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(2).toBe(2);
//         done();
//     }, 2000)
// })


test('Should add two numbers', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5);
        done();
    })
})


// test('Should add two numbers async/await', async(done) => {
//     const sum = await add(10, 22);
//     expect(sum).toBe(32);
// })










/*

Why Test ?

- Save time
- Create more reliable software
- Give flexibility to developers
- Refractoring
- Collabarating
- Profiling
- Peace of mind

*/