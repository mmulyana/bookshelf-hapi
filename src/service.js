const books = require('./data')

const bookServices = {
  create: function (payload) {
    books.push(payload)
  },
  findMany: function ({ name, reading, finished }) {
    let result = books

    if (typeof name !== 'undefined' && name !== '') {
      result = result.filter((book) =>
        book.name.toLowerCase().includes(name.toLowerCase())
      )
    }

    if (typeof reading !== 'undefined' && reading === '1') {
      result = result.filter((book) => book.reading === true)
    } else if (typeof reading !== 'undefined' && reading === '0') {
      result = result.filter((book) => book.reading === false)
    }

    if (typeof finished !== 'undefined' && finished === '1') {
      result = result.filter((book) => book.finished === true)
    } else if (typeof finished !== 'undefined' && finished === '0') {
      result = result.filter((book) => book.finished === false)
    }

    return result.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }))
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
