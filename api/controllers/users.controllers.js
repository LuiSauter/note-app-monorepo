const usersCtrl = {}
const bcrypt = require('bcrypt')
const UserModel = require('../models/User')

usersCtrl.getUsers = async (request, response) => {
  const users = await UserModel.find({})
  response.json(users)
}

usersCtrl.createUser = async (request, response) => {
  try {
    const { body } = request
    const { username, name, password } = body

    const saltRounds = 10
    // encryptando password
    const passwordHash = await bcrypt.hash(password, saltRounds)

    if (!username) {
      return response.status(400).json({
        error: 'required "username" field is missing'
      })
    }
    // new user
    const newUser = new UserModel({
      username: username,
      name: name,
      passwordHash
    })

    const saveUser = await newUser.save()
    response.status(201).json(saveUser)
  } catch (error) {
    response.status(400).json(error)
  }
}

usersCtrl.getUser = async (request, response, next) => {
  const { id } = request.params
  try {
    const user = await UserModel.findById(id)
    if (user) response.json(user)
    else response.status(404).end()// Not Found
  } catch (error) {
    next(error)
  }
}

usersCtrl.updateUser = async (request, response, next) => {
  const { id } = request.params
  const { username, name, password } = request.body

  const saltRounds = 10
  // encryptando password
  const passwordHas = await bcrypt.hash(password, saltRounds)

  const newUser = {
    username,
    name,
    passwordHas
  }

  const newUpdateUser = await UserModel.findOneAndUpdate(id, newUser)

  response.json(newUpdateUser)
}

usersCtrl.deleteUser = async (request, response, next) => {
  const { id } = request.params
  await UserModel.findOneAndDelete(id)
  response.status(204).end()
}

module.exports = usersCtrl
