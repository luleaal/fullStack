const express = require('express')
let persons = require('./db.json');
const cors = require('cors')

const app = express()

app.use(express.static('dist'))

const morgan = require('morgan'); 

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)

morgan.token('postData', (req) => {
   return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));


app.get('/api/persons', (request, response) => {
  response.json(persons)
})
// http://localhost:3001/api/persons

app.get('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})
// http://localhost:3001/api/persons/1

app.get('/info', (request, response) => {
    const num = persons.length
    const now = new Date().toString();
    const resp = "Phonebook has info for " + num + " people <br/> " + now

    response.send(resp)
  })
// http://localhost:3001/info

app.delete('/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
}) 

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    });
  }

  const duplicatePerson = persons.find((person) => person.name === body.name);
  if (duplicatePerson) {
    return response.status(400).json({ error: 'name must be unique' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

app.use(unknownEndpoint);

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});