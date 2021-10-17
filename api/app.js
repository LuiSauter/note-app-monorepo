const express = require('express')
const cors = require('cors')
const logger = require('./loggerMiddleware')

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const app = express()

// settings
// app.set('port', process.env.PORT || 4000)
// middlewares
app.use(cors())
app.use(express.json())
app.use(logger)
app.use(express.static('../app/build'))

Sentry.init({
  dsn: 'https://84534cfd6c8142f9a5635aae69d6c493@o1024561.ingest.sentry.io/5990401',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

// Route principal
app.get('/', (request, response) => {
  response.send('<h1>My First API with nodejs, expressjs, mongodb, mongoose</h1>')
})
// Routes notes. Antes de crear note verificar si esta loggeado
app.use('/api/notes', require('./routes/notes'))
// Routes users
app.use('/api/users', require('./routes/users'))
// Routes login
app.use('/api/login', require('./routes/login'))
// Routes test
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', require('./routes/testing'))
}

// manejo de errores
app.use(notFound)

app.use(Sentry.Handlers.errorHandler())

app.use(handleErrors)

module.exports = app
