import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb://root:password@localhost:27017/');
const dbName = 'TodoApp';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('connected successfully to server');

  const db = client.db(dbName);
  const todos = db.collection('Todos');
  const users = db.collection('Users');

  await todos.findOneAndUpdate({
    _id: new ObjectId('694d705bb014123ddc727efe')
  }, {
    $set: {
      completed: false
    }
  }, {
    returnOriginal: true
  }).then((result) => {
    console.log(result);
  });

  await users.findOneAndUpdate({
    _id: new ObjectId('694d705bb014123ddc727eff')
  }, {
    $set: {
      name: 'Andrew'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());


// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID('5a86c378baa6685dd161da6e')
// }, {
//   $set: {
//     completed:true
//   }
// }, {
//   returnOriginal: false
// }).then((result) => {
//   console.log(result);
// });

//   db.collection('Users').findOneAndUpdate({
//     _id: new ObjectID('5a868fa51a01c50c6ac3c1b3')
//   }, {
//     $set: {
//       name: 'Andrew'
//     },
//     $inc: {
//       age: 1
//     }
//   }, {
//     returnOriginal: false
//   }).then((result) => {
//     console.log(result);
//   });


//   //client.close();
// });
