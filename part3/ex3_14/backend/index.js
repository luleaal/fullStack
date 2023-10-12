require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))

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


app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
});


app.get('/persons/:id', (request, response) => {
  Person.findById(request.params.id)
      .then(person => {
          response.json(person)
      })
})
// http://localhost:3001/api/persons/1

app.get('/info', (request, response) => {
    const num = persons.length
    const now = new Date().toString();
    const resp = "Phonebook has info for " + num + " people <br/> " + now

    response.send(resp)
  })
// http://localhost:3001/info

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
      .then(person => {
          response.status(204).end()
      })
      .catch(error => {
          response.status(500).send('Error deleting person: ' + error)
      })
})


// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
      return response.status(400).json({
          error: 'Name and/or number missing'
      })
  }

  const person = new Person({
      name: body.name,
      number: body.number,
  })

  person.save().then(savedPerson => {
      response.json(savedPerson)
  })
})

app.use(unknownEndpoint);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});