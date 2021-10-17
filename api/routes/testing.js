const { Router } = require('express')
const testingRouter = Router()

const { resetDB } = require('../controllers/testing.controllers')

testingRouter.route('/reset')
  .post(resetDB)

module.exports = testingRouter
