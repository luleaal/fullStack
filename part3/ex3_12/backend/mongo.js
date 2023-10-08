const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Usage: node mongo.js <password> [<name> <number>]');
  process.exit(1);
}

const url =
  `mongodb+srv://luciale:1tXwGcesMA606h5h@cluster0.xm9ig8c.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=AtlasApp`

mongoose.set('strictQuery',false)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  // If only password provided, list all persons
  Person.find({}).then((persons) => {
    console.log('phonebook:');
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  // If password, name, and number provided, add a new person
  const name = process.argv[3];
  const number = process.argv[4];

  const newPerson = new Person({
    name,
    number,
  });

  newPerson.save().then(() => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log('Invalid number of arguments.');
  mongoose.connection.close();
}

