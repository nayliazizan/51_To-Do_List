//require express and the functions that we created in controller/index.js
const express = require('express');
const {create, read, removeTodo} = require('../controller');

//declare router var to initialize the router obj using .router() method
const router = express.Router();

// *create routes for POST, GET, and DELETE*
router.post('/todo/create', create);
router.get('/todos', read);
router.delete('/todo/:id', removeTodo);

module.exports = router;