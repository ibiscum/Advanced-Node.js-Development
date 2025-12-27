import config from './config/config.js';


const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var rateLimit = require('express-rate-limit');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user').default;

var app = express();
const port = process.env.PORT || 3000;

// Rate limiter: limit to 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
         text: req.body.text
   });

   todo.save().then((doc) => {
     res.send(doc);
   }, (e) => {
     res.status(400).send(e);
   });
});

app.get('/todos', (req, res) => {
   Todo.find().then((todos) => {
         res.send({todos});
   }, (e) => {
         res.status(400).send(e);
   });
});

//GET /todos/12345
app.get('/todos/:id', (req, res) =>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
     res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
   var id = req.params.id;

   if(!ObjectID.isValid(id)) {
     return res.status(404).send();
   }

   Todo.findByIdAndRemove(id).then((todo) => {
         if(!todo) {
               return res.status(404).send();
         }
         res.send({todo});
   }).catch((e) => {
         res.status(400).send();
   });
});

app.patch('/todos/:id',(req, res) => {
   var id = req.params.id;
   var body = _.pick(req.body, ['text', 'completed']);

   // Validate types to prevent MongoDB injection via query operators
   if (body.text !== undefined && typeof body.text !== 'string') {
     return res.status(400).send({ error: "Invalid 'text' value." });
   }
   if (body.completed !== undefined && typeof body.completed !== 'boolean') {
     return res.status(400).send({ error: "Invalid 'completed' value." });
   }
   // Prevent update keys from containing $ or . to block operator injection
   if (Object.keys(body).some(key => key.startsWith('$') || key.includes('.'))) {
     return res.status(400).send({ error: "Invalid request property name." });
   }
   if(!ObjectID.isValid(id)){
     return res.status(404).send();
   }

   // Build the $set update object explicitly to prevent operator injection
   let update = {};
   if ('text' in body) {
     update.text = body.text;
   }
   if (_.isBoolean(body.completed) && body.completed) {
     update.completed = true;
     update.completedAt = new Date().getTime();
   } else {
     update.completed = false;
     update.completedAt = null;
   }

   Todo.findByIdAndUpdate(id, {$set: update}, {new: true}).then((todo) => {
     if(!todo)
     {
       return res.status(404).send();
     }

     res.send({todo});
   }).catch((e) => {
     res.status(400).send();
  })
});

app.listen(port, () => {
   console.log(`Started on port ${port}`);
});

module.exports = {app};
