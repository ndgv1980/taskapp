var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const router = express.Router();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersTasks = require('./routes/tasks');
var usersGoals = require('./routes/goals');
var tasksRouter = require('./routes/tasks');
var goalsRouter = require('./routes/goals');

var app = express();

const mysql = require('mysql');
var connection = mysql.createConnection({
host:'localhost',
user:'sqluser',
port: 3306,
password:'password'
});

connection.connect(function(err)
{
  if(err){
    console.error('error connecting' + err.stack);
    return;
  }
  console.log('Connected as id' + connection.threadId);

});

let queryCreateDB = 'CREATE DATABASE IF NOT EXISTS desarrolloweb';
let queryCreateTableGoals = 'CREATE TABLE IF NOT EXISTS desarrolloweb.goals( \
id int(11) NOT NULL auto_increment, \
name varchar(250) NOT NULL default \' \', \
description varchar(250) NOT NULL default \' \', \
dueDate varchar(250) NOT NULL default \' \', \
PRIMARY KEY(id) \
);'

let queryCreateTableTasks = 'CREATE TABLE IF NOT EXISTS desarrolloweb.tasks( \
id int(11) NOT NULL auto_increment, \
name varchar(250) NOT NULL default \' \', \
description varchar(250) NOT NULL default \' \', \
dueDate varchar(250) NOT NULL default \' \', \
PRIMARY KEY(id) \
);'

connection.query(queryCreateDB, function(err, results, fields){
if(err)
  {
    console.log(err);
    return; 
  }
  else
  {
    console.log(results);
  }
});

connection.query(queryCreateTableGoals, function(err, results, fields){
if(err)
  {
    console.log(err);
    return; 
  }
  else
  {
    console.log(results);
  }
});

connection.query(queryCreateTableTasks, function(err, results, fields){
if(err)
  {
    console.log(err);
    return; 
  }
  else
  {
    console.log(results);
  }
});

connection.destroy();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.use((req, res, next) => {
  if (req.headers.authorization && req.headers.authorization === '123456') {
    next();
  }
  else {
    res.status(401).json({ error: 'No se encontro autorización' });
  }
});

app.use('/', indexRouter);
app.use('/', router);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/goals', goalsRouter);
//app.use('/tasks', usersTasks);
//app.use('/goals', usersGoals);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
