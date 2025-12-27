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

  await todos.find({
    _id: new ObjectId('694d705bb014123ddc727efe')
  }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  await todos.countDocuments().then((count) => {
    console.log(`Todos count: ${count}`);
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  await users.find({name: 'Andrew'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  });
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
