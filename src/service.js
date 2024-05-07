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
  updateById: function (id, payload) {
    const index = books.findIndex((book) => book.id == id)
    const newData = {
      ...books[index],
      ...payload,
    }
    books[index] = newData
  },
  deleteById: function (id) {
    const index = books.findIndex((book) => book.id == id)
    books.splice(index, 1)
  },
}

module.exports = bookServices
