import expect from 'expect';
import request from 'supertest';

import { app } from './../server.js';
import { Todo } from './../models/todo.js';

const todos = [{
   text: 'First test todo'
},{
   text: 'Second test todo'
}];

beforeEach((done) =>{
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
   it('should create a new todo',(done) => {
     var text = 'Test todo text';
     request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
          expect(res.body.text).toBe(text);
      })
      .end((err) => {
        if(err) {
         return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
   })

   it('should not create todo with invalid body data', (done) => {
     request(app)
     .post('/todos')
     .send({})
     .expect(400)
     .end((err) => {
       if(err){
         return done(err);
       }
       Todo.find().then((todos) => {
         expect(todos.length).toBe(2);
         done();
       }).catch((e) => done(e));
     });
   });
});

describe('GET /todos', () => {
   it('should get all todos', (done) => {
     request(app)
     .get('/todos')
     .expect(200)
     .expect((res) => {
       expect(res.body.todos.length).toBe(2);
     })
     .end(done);
   });
});
