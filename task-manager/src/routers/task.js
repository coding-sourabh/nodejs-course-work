const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();


router.post('/task', auth, async (req, res) => {
    const task = new Task({
        ...req.body, 
        owner : req.user._id
    })

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});


// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET / tasks?sortBy=createdAt:asc/desc
router.get('/tasks', auth, async (req, res) => { // api endpoint for getting all tasks
    const match = {};
    const sort = {};

    if(req.query.completed) {
        match.completed = req.query.completed === 'true';
    }
    
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] == 'desc' ? -1 : 1; 
    }

    try {
        // const tasks = await Task.find({owner : req.user._id});
        await req.user.populate({
            path : 'tasks',
            match,
            options : {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip),
                sort
            }
        });
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send();
    }
});


// api endpoint for getting particular task based on id passed as param
router.get('/tasks/:id', auth, async (req, res) => { // express also provide dynamic path finding

    try {
        // const task = await Task.findById(req.params.id); // mongoose automatically coverts string id to ObjectID
         
        const task = await Task.findOne({ _id : req.params.id, owner : req.user._id}) 
        
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);

    } catch (e) {
        res.status(500).send(e);
    }

});


router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];

    const isVaildOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isVaildOperation) {
        return res.status(400).send({
            error: 'invalid operation'
        })
    }

    try {

        const task = await Task.findOne({_id : req.params.id, owner : req.user.id});
        
            if (!task) {
            return res.status(404).send();
        }
        
        updates.forEach(update => task[update] = req.body[update]);
        await task.save();
        res.send(task);

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })

    } catch (e) {
        res.status(400).send(e);
    }
})



router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id :req.params.id, owner : req.user._id});
        if (!task) {
            res.status(400).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
})


module.exports = router;