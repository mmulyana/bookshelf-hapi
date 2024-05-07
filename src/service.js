const books = require('./data')

const bookServices = {
  create: function (payload) {
    books.push(payload)
  },
  findMany: function () {
    return books
  },
  findById: function (id) {
    return books.filter((book) => book.id === id)
  },
}

module.exports = bookServices
