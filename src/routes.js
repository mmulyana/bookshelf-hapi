const { createBookHandler } = require('./controller')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: createBookHandler,
  },
]

module.exports = routes
