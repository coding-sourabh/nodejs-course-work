// // async always returns a promise
// const doWork = async () => {
//     throw new Error('something went wrong')
//     return "sourabh";
// }

const {
    rejects
} = require("assert")

// doWork()
//     .then(result => {
//         console.log(result)
//     })
//     .catch(e => console.log(e))


//  *************************************************************************************************

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0)
                return reject('Numbers should be positive')
            resolve(a + b);
        }, 2000);
    })
}

const doWork = async () => {    // this saves us from promise chaining
    const sum = await add(99, -1);
    const sum2 = await add(sum, 50);
    const sum3 = await add(sum2, 3);
    return sum3;
}

doWork()
    .then(result => {
        console.log(result)
    })
    .catch(e => console.log(e))