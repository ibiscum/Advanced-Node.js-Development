import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://admin:your_strong_password@localhost:27017/');
const dbName = 'TodoApp';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('connected successfully to server');

  const db = client.db(dbName);
  const todos = db.collection('Todos');

  let deleteResult = await todos.deleteOne({text: 'Eat lunch'});
  console.log('Deleted todos =>', deleteResult);


}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());



// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
//   if(err){
//     return console.log('Unable to connect MongoDB server');
//   }
//   console.log('Connected to MongoDB server');
//   const db = client.db('TodoApp');

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  //db.collection('Users').deleteMany({name: 'Andrew'});

  // db.collection('Users').findOneAndDelete({
  //   _id: new ObjectID("5a86978929ed740ca87e5c31")
  // }).then((results) => {
  //   console.log(JSON.stringify(results, undefined, 2));
  // });

  //client.close();
//});
