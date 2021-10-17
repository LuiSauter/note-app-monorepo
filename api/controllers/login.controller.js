const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const UserModel = require('../models/User')
const loginCtrl = {}

loginCtrl.login = async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await UserModel.findOne({ username })
  console.log(user)
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'Invalid user or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }
  // primero el objeto y despues la clave secreta
  const token = jwt.sign(
    userForToken,
    process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7 // cada 7 dias se tiene que loguear
    }) // firma digital

  response.send({
    name: user.name,
    username: user.username,
    token
  })
}

module.exports = loginCtrl
