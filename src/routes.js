const { createBookHandler, getBookHandler } = require('./controller')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: createBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBookHandler,
  },
]

module.exports = routes
