//which we will use to parse our postgre data
const formidable = require('formidable');
//import the functions we created in model/todo.js
const {create, get, remove} = require('../model/todo');

// *we need to process the data passed in with request in order...*
// *to save tasks to the todo db*

//create exported middleware function called create for add tasks to todo db...
//that receives rest api request and response data.
//the function should take req and res as its arguments and...
exports.create = (req, res) => {
    //should use formidable to parse the received form data to check to see...
    //if the description field is received
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
      const { description } = fields;
      // check to see if the description field exists in the form
      // if description doesn't exist, send error
      if (!fields.description) {
        return res.status(400).json({
          error: 'Description is required',
        });
      }
      // if description exists, add new entry to db using imported create() function
      try {
        const newTask = await create(description);
        return res.status(201).send({ data: newTask.rows[0] });
      } catch (error) {
        // if description cannot be added to database, send error
        return res.status(400).json({
          error,
        });
      }
    });
  };

// *add another exported async function called read for fetch...*
// *all existing items in todo db*

//the function should take req and res as its arguments and use get() function...
//to return all rows of the table as a response
exports.read = async (req, res) => {
    try {
      const task = await get();
      return res.json({ data: task.rows });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  };

// *create exported async function called removeTodo for deleting...*
// *a task from todo db*

//the function will take res and res as its arguments and use exported remove()...
//to match and delete the row with the same id
exports.removeTodo = async (req, res) => {
    const id = Number(req.params.id);
    try {
      await remove(id);
      return res.status(200).send({ data: id });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  };
