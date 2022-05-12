const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) { // validation of email using validate package
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) { // This is the custom validation we can provide 
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

    avatar : {
        type : Buffer
    }
}, {
    timestamps : true
})

userSchema.virtual('tasks', {   // not stored in db, it just for moongoose to figure out who related to what
    ref : 'Task',
    localField : '_id',
    foreignField : 'owner'
})


// we use schema to use middlewares

userSchema.methods.toJSON = function () {   // when response goes back and converted to json this method will be called automatically and here we remove the things which we don't want to send
    const user = this;
    const userObject = user.toObject();   // it will return raw data and remove other things like save functionality attached to it 

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}


userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({
        _id: user._id.toString()
    }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({    // add this token to tokens array of user 
        token
    })

    await user.save();
    return token;
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.find({
        email: email
    })

    if (user.length === 0) {
        return new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user[0].password)

    if (!isMatch) {
        return new Error('Unable to login')
    }
    return user[0];
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next() // when we are done with code before saving it, absolutely necessary to call it
    // otherwise it will hang at this position and think that we are still doing somthing
})


// Delete user task when user is removed
userSchema.pre('remove', async function(next) {
    const user = this;
    await Task.deleteMany({ owner : user.id});
    next();
})


const User = mongoose.model('User', userSchema);

module.exports = User;

//////////////////////////////////////////////////////////////////////////////////////////////////
// const me = new User({
//     name: '  inouske  ',
//     email: 'ino@gmail.com',
//     password: 'sd434sword  '
// });

// me.save().then((me) => {
//     console.log(me);
// }).catch((e) => {
//     console.log(e);
// })