var express = require('express');
var router = express.Router();

let tasks = [];

/* GET users listing. */
router.get('/getTasks', function(req, res, next) {
    res.json(tasks);
});

router.post('/addTask', function(req, res, next) {
    let timestamp = Date.now() + Math.random();
    
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        req.body.id = timestamp;
        tasks.push(req.body);
    }
    res.json(tasks);
});

router.delete('/removeTask/:id', function(req, res, next) {
    if (req.params && req.params.id) {
        const id = req.params.id;
        tasks = tasks.filter(task => task.id != id);
        res.json(tasks);
    }
    else {
        res.json([]);
    }
});

module.exports = router;