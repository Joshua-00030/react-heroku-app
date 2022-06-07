const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Entry = require('./models/entry')
const app = express()


morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

/*
const generateId = () => {
  const persons = Entry.find({})
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}
*/
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const entry = new Entry({
    name: body.name,
    phoneNumber: body.phoneNumber
  })

  entry.save().then(savedEntry => {
    //console.log(`${savedEntry.name} added to phonebook`)
    response.json(savedEntry)
  }).catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  console.log('Phonebook:')
  Entry.find({}).then(result => {
    result.forEach(entry => {
      console.log(`${entry.name}: ${entry.phoneNumber}`)
    })
    response.json(result)
    //mongoose.connection.close()
  })
})

app.get('/api/info', (req, res) => {
  Entry.find({}).then(response => {
    res.send(`Phonebook has info for ${response.length} people <br/> ${new Date}`)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Entry.findByIdAndRemove(request.params.id)
    .then(response.status(204).end())
    .catch(error => next(error))

})

app.get('/api/persons/:id', (request, response, next) => {
  Entry.findById(request.params.id).then(entry => {
    if (entry) {
      response.json(entry)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const entry = {
    name: body.name,
    phoneNumber: body.phoneNumber
  }

  Entry.findByIdAndUpdate(request.params.id, entry,
    { new: true, runValidators: true, context: 'query' })
    .then(updatedEntry => {
      response.json(updatedEntry)
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})