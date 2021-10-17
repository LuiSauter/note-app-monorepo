const ERROR_HANDLERS = {
  CastError: (res) => // bad request
    res.status(400).send({ error: 'id used in malformed' }),

  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  JsonWebTokenError: (res) =>
    res.status(401).json({ error: 'token missing or invalid' }),

  TokenExpiredError: (res) =>
    res.status(401).json({ error: 'token expired' }),

  defaultError: (res) => res.status(500).end() // error de servidor
}

module.exports = (error, request, response, next) => {
  console.error(error.name)

  const handler =
    ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handler(response, error)
}
