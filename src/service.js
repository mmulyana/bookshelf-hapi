const books = require('./data')

const bookServices = {
  create: function (payload) {
    books.push(payload)
  },
  findMany: function () {
    return books
  },
}

module.exports = bookServices
