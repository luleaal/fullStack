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
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }  
      })
      .catch(error => next(error))
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
      .catch(error => next(error))
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

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});