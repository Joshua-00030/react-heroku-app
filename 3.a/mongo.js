const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('program usage: node mongo.js serverpassword name number')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://admin:${password}@cluster0.7t1ow.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
})

const Entry = mongoose.model('Entry', phonebookSchema)

const entry = new Entry({
  name: process.argv[3],
  phoneNumber: process.argv[4]
})

if (process.argv.length > 3) {
  entry.save().then(() => {
    console.log(`${entry.name} added to phonebook`)
    mongoose.connection.close()
  })
}

else {
  console.log('Phonebook:')
  Entry.find({}).then(result => {
    result.forEach(entry => {
      console.log(`${entry.name}: ${entry.phoneNumber}`)
    })
    mongoose.connection.close()
  })
}