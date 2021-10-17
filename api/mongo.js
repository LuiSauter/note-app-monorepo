// Siempre devuelven promesas
const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI

// conection to mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database is conneted')
  }).catch(err => console.error(err, 'error'))

// por si se rompe algo quitamos la coneccion para que no quede zombie
process.on('uncaughtException', (err) => {
  console.log(err)
  mongoose.disconnect()
})
