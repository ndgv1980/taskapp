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


/* GET users listing. */
router.get('/getGoals', function(req, res, next) {
    let queryGetGoals = 'SELECT * FROM desarrolloweb.goals';
    connection.query(queryGetGoals, function(err, results, fields){
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

router.post('/addGoal', function(req, res, next) {
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        let queryCreateGoals = 'INSERT INTO desarrolloweb.goals (name, description, dueDate) \
        VALUES("'+req.body.name+'", "'+req.body.description+'", "'+req.body.dueDate+'")';
        connection.query(queryCreateGoals, function (err, results, fields){
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

router.delete('/removeGoal/:id', function(req, res, next) {
    if (req.params && req.params.id) {
        const id = req.params.id;
        let queryDeleteGoals = 'DELETE FROM desarrolloweb.goals WHERE id="'+id+'"';
                connection.query(queryDeleteGoals, function(err, results, fields){
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