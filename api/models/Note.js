const { Schema, model } = require('mongoose')
// con mongoose estructuramos (schema) nuestra base de datos
const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

// controlar el JSON para poder cambiar o quitar el _id y __v
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// singular
const Note = model('Note', noteSchema)

module.exports = Note
