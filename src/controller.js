const { nanoid } = require('nanoid')
const { createBookSchema, checkBookByID, updateBookSchema } = require('./utils')
const bookServices = require('./service')

function createBookHandler(req, h) {
  try {
    const validated = createBookSchema(req.payload)
    if (!validated.ok) {
      throw new Error(validated.message)
    }

    const payload = validated.data
    payload.id = nanoid(16)
    payload.reading ??= false
    payload.finished = payload.pageCount === payload.readPage
    payload.insertedAt = new Date().toISOString()
    payload.updatedAt = new Date().toISOString()

    bookServices.create(payload)

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: payload.id,
        },
      })
      .code(201)
  } catch (error) {
    return h
      .response({
        status: 'fail',
        message: error.message,
      })
      .code(400)
  }
}

function getBooksHandler(req, h) {
  const books = bookServices.findMany()

  return h
    .response({
      status: 'success',
      data: {
        books,
      },
    })
    .code(200)
}

function getBookHandler(req, h) {
  const { bookId } = req.params
  try {
    if (!checkBookByID(bookId)) {
      throw new Error('Buku tidak ditemukan')
    }

    const book = bookServices.findById(bookId)

    return h
      .response({
        status: 'success',
        data: {
          book,
        },
      })
      .code(200)
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: error.message,
    })
    response.code(500)

    if (error.message == 'Buku tidak ditemukan') {
      response.code(404)
    }

    return response
  }
}

function updateBookHandler(req, h) {
  const { bookId } = req.params
  try {
    if (!checkBookByID(bookId)) {
      throw new Error('Gagal memperbarui buku. Id tidak ditemukan')
    }

    const validated = updateBookSchema(req.payload)
    if (!validated.ok) {
      throw new Error(validated.message)
    }

    const payload = validated.data
    payload.finished = payload.readPage == payload.pageCount
    payload.updatedAt = new Date().toISOString()

    bookServices.updateById(bookId, payload)

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200)
  } catch (error) {
    console.log(error)
    if (error.message == 'Gagal memperbarui buku. Id tidak ditemukan') {
      return h
        .response({
          status: 'fail',
          message: error.message,
        })
        .code(404)
    }

    return h
      .response({
        status: 'fail',
        message: error.message,
      })
      .code(400)
  }
}

module.exports = {
  createBookHandler,
  getBooksHandler,
  getBookHandler,
  updateBookHandler,
}
