const { Router } = require('express')
const router = Router()
const userExtractor = require('../middleware/userExtractor')

const { getNotes, createNote, getNote, updateNote, deleteNote } = require('../controllers/notes.controllers')

router.route('/')
  .get(getNotes)
  .post(userExtractor, createNote)

router.route('/:id')
  .get(getNote)
  .put(userExtractor, updateNote)
  .delete(userExtractor, deleteNote)

module.exports = router
