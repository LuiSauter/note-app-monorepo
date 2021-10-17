const UserModel = require('../models/User')
const notesCtrl = {}

const NoteModel = require('../models/Note')
// GET ALL
notesCtrl.getNotes = async (request, response) => {
  const notes = await NoteModel.find({})
  response.json(notes)
}
// POST
notesCtrl.createNote = async (request, response, next) => {
  const { content, important = false } = request.body
  const { userId } = request
  const user = await UserModel.findById(userId)
  console.log(user, 'USER')

  if (!content) {
    return response.status(400).json({ // bad request
      error: 'required "content" field is missing'
    })
  }

  const newNote = new NoteModel({
    content: content,
    // date: typeof (date) === 'undefined' ? Date.now() : date,
    date: Date.now(),
    important: important,
    user: user.id
  })

  try {
    const saveNote = await newNote.save()
    response.json(saveNote)// create
  } catch (error) {
    console.log(error)
  }
}
// GET
notesCtrl.getNote = async (request, response, next) => {
  const { id } = request.params
  try {
    const note = await NoteModel.findById(id)
    if (note)response.json(note)
    else response.status(404).end()// not Found
  } catch (error) {
    next(error)
  }
}
// UPDATE
notesCtrl.updateNote = async (request, response, next) => {
  try {
    const { id } = request.params
    const note = request.body
    console.log(id, note, 'luisi')
    const newNoteInfo = {
      content: note.content,
      important: note.important
    }

    const noteUp = await NoteModel.findByIdAndUpdate(id, newNoteInfo, { new: true })

    response.json(noteUp)
  } catch (error) {
    next(error)
  }
}
// DELETE
notesCtrl.deleteNote = async (request, response, next) => {
  try {
    const { id } = request.params
    await NoteModel.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
}

module.exports = notesCtrl
