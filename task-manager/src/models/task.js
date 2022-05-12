const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // creating a relationship with User Model
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)



// const doLaundry = new Task({
//     description: "DO laundry"
// })

// doLaundry.save().then((task) => {
//     console.log(task);
// }).catch((e) => {
//     console.log(e);
// })

module.exports = Task;