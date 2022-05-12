require('../task-manager/src/db/mongoose');
const Task = require('../task-manager/src/models/task');

// Task.findByIdAndDelete("624457b991ab65877b70003e").then((result) => {
//     console.log(result);

//     return Task.countDocuments({       // promise chaining,  we can return a promise from then
//         completed: false
//     }).then((result) => {
//         console.log(result);
//     })
// }).catch((e) => {
//     console.log(e);
// })

// promise chaining to async await transformation
// we need a async function to do all that
const findByIdAndDeleteAndCount = async (id) => {
    const result = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({
        completed: false
    });
    return count;
}

const countPromise = findByIdAndDeleteAndCount("62444a01e5cce55f51a84b45"); // this will return a promise

countPromise
.then(cnt => console.log(cnt))    // if resolved gives us the count
.catch(e => console.log(e))