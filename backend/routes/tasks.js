var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
host:'localhost',
user:'sqluser',
port: 3306,
password:'password',
database: 'desarrolloweb'
});

connection.connect(function(err)
{
  if(err){
    console.error('error connecting' + err.stack);
    return;
  }
  console.log('Connected as id' + connection.threadId);

});

let tasks = [];

/* GET users listing. */
router.get('/getTasks', function(req, res, next) {
    let queryGetTasks = 'SELECT * FROM desarrolloweb.tasks';
            connection.query(queryGetTasks, function(err, results, fields){
    if(err)
    {
        res.status(500).json(err);
    }
    else
    {
        res.status(200).json(results);
    }
    })
});

router.post('/addTask', function(req, res, next) {
 
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        let queryCreateTasks = 'INSERT INTO desarrolloweb.tasks (name, description, dueDate) \
        VALUES("'+req.body.name+'", "'+req.body.description+'", "'+req.body.dueDate+'")';
        connection.query(queryCreateTasks, function (err, results, fields){
        if(err)
        {
            res.status(500).json(err);
        }
        else
        {
            res.status(200).json(results);
        }
        })
    }
    else
    {
        res.status(401).json();
    }
});

router.delete('/removeTask/:id', function(req, res, next) {
    if (req.params && req.params.id) {
        const id = req.params.id;
        let queryDeleteTasks = 'DELETE FROM desarrolloweb.tasks WHERE id="'+id+'"';
                connection.query(queryDeleteTasks, function(err, results, fields){
        if(err)
        {
            res.status(500).json(err);
        }
        else
        {
            res.status(200).json(results);
        }
        })
    }
    else {
        res.status(400).json({});
    }
});

module.exports = router;