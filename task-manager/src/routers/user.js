const express = require('express');
const {
    route
} = require('express/lib/application');
const User = require('../models/user');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();
const auth = require('../middleware/auth');


router.post('/users', async (req, res) => {

    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();

        res.status(201).send({
            user,
            token
        });
    } catch (e) {
        res.status(400).send(e);
    }

    // using promises
    // user.save().then(() => {  
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        if (user instanceof Error) {
            return res.status(400).send();
        }
        const token = await user.generateAuthToken()
        res.send({
            user,
            token
        });
    } catch (e) {
        res.status(400).send(e.message);
    }
})


router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
})


router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send();
    }
})


// auth is a middleware here, and when next called in middleware, this req. handler is executed
router.get('/users/me', auth , async (req, res) => { // api endpoint for getting all users
    res.send(req.user);
});


// api endpoint for getting particular user based on id passed as param
// router.get('/users/:id', async (req, res) => { // express also provide dynamic path finding

//     try {

//         const user = await User.findById(req.params.id);
//         if (!user)
//             return res.status(404).send();
//         res.send(user);
//     } catch (e) {
//         res.status(500).send();
//     }

// });   // no need now as we should not be allowed to fetch some other user unless its us and we have 
        // /users/me for that



router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];

    const isVaildOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isVaildOperation) {
        return res.status(400).send({
            error: 'invalid operation'
        })
    }

    try {

        updates.forEach((update) => req.user[update] = req.body[update]);

        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
})


router.delete('/users/me', auth, async (req, res) => {
    try {
        req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
})

const upload = multer({
    // dest : 'avatars',   // to access req.file we need to remove it

    limits : {
        fileSize : 1000000,    // 1 mb limit
    },
    
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {   // if file is not one of these extension
            return cb(new Error('upload image !'));
        }

        cb(undefined, true); 
    }
})


// first authenticate and then allow upload
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width : 250, height : 250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send()
}, (error, req, res, next) => {    // to handle error from middleware 
    res.status(400).send({error : error.message})
})


router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
})


router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id) ;

        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);

    } catch(e) {
        res.status(400).send();
    }
})


module.exports = router;    