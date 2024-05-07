const books = require('./data')
function createBookSchema(payload) {
  if (typeof payload.name == 'undefined' || payload.name == '') {
    return {
      ok: false,
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }
  }

  if (payload.readPage > payload.pageCount) {
    return {
      ok: false,
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }
  }

  return {
    ok: true,
    data: payload,
  }
}

function checkBookByID(id) {
  const isBookExist = books.findIndex((book) => book.id === id)
  return isBookExist !== -1
}

function updateBookSchema(payload) {
  if (typeof payload.name == 'undefined' || payload.name == '') {
    return {
      ok: false,
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }
  }

  if (payload.readPage > payload.pageCount) {
    return {
      ok: false,
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }
  }

  return {
    ok: true,
    data: payload,
  }
}

module.exports = { createBookSchema, updateBookSchema, checkBookByID }
