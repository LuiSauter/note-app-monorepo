const UserModel = require('../models/User')
const NoteModel = require('../models/Note')

const noteAndUserDB = {}

noteAndUserDB.resetDB = async (request, response) => {
  await UserModel.deleteMany({})
  await NoteModel.deleteMany({})

  response.status(204).end()
}

module.exports = noteAndUserDB
