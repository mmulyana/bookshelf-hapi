const REQUIRED_FIELDS = [
  'name',
  'year',
  'author',
  'summary',
  'publisher',
  'pageCount',
  'readPage',
]
function createBookSchema(payload) {
  if (!payload || typeof payload !== 'object') {
    return {
      ok: false,
      message: 'Invalid request',
    }
  }

  let isValid = true
  REQUIRED_FIELDS.forEach((obj) => {
    if (!payload.hasOwnProperty(obj) && typeof payload[obj] !== undefined) {
      console.log(obj)
      isValid = false
    }
  })

  if (!isValid) {
    return {
      ok: false,
      message: 'Invalid request',
    }
  }

  if (payload.name == '') {
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

module.exports = { createBookSchema }
