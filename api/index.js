require('dotenv').config()
const app = require('./app')
require('./mongo') // Se ejecutaria directamente

const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
