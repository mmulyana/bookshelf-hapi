const { nanoid } = require('nanoid')
const { createBookSchema } = require('./utils')
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
    payload.finished = payload.readCount === payload.readPage
    payload.insertedAt = new Date().toISOString()
    payload.updatedAt = new Date().toISOString()

    bookServices.create(payload)

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: payload.id,
      },
    })
    response.code(201)
    return response
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: error.message,
    })
    response.code(400)
    return response
  }
}

function getBookHandler(req, h) {
  const books = bookServices.findMany()

  const response = h.response({
    status: 'success',
    data: {
      books,
    },
  })

  response.code(200)

  return response
}

module.exports = { createBookHandler, getBookHandler }
