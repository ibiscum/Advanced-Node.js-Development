import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://admin:your_strong_password@localhost:27017/');

const dbName = 'TodoApp';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('Todos');
  const insertResult = await collection.insertOne({
    text: 'Something to do',
    completed: false
  })
  console.log('Inserted one todo =>', insertResult);


  // db.collection('Todos').insertOne(, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

// MongoClient.connect('mongodb://0.0.0.0:27017/TodoApp', (err, client) => {
//   if(err){
//     return console.log('Unable to connect MongoDB server');
//   }
//   console.log('Connected to MongoDB server');
//   const db = client.db('TodoApp');

//   db.collection('Todos').insertOne({
//       text: 'Something to do',
//       completed: false
//     }, (err, result) => {
//       if(err){
//         return console.log('Unable to insert todo', err);
//       }
//       console.log(JSON.stringify(result.ops, undefined, 2));
//   });

  //Insert new doc into Users(name, age, loction)
  // db.collection('Users').insertOne({
  //     name: 'Andrew',
  //     age: 25,
  //     location: 'Philadelphia'
  //   }, (err, result) => {
  //     if(err) {
  //       return console.log('Unable to insert user', err);
  //     }
  //     console.log(result.ops[0]._id.getTimestamp());
  // });

//   client.close();
// });
