const {
  createBookHandler,
  getBookHandler,
  getBooksHandler,
} = require('./controller')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: createBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookHandler,
  },
]

module.exports = routes
