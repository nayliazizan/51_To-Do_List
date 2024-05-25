const pool = require('./database');

//create a function that will insert a description into todo table
const create = description =>
  pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [
    description,
  ]);

//create a function that called get that will read all the tasks in todo table
const get = () => pool.query('SELECT * FROM todo');

//create a function that called remove that takes id as argument to...
//search for a to-do item to remove from todo table
const remove = id => pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);

//export all 3 functions so that we can used it in this app
module.exports = {create, get, remove};