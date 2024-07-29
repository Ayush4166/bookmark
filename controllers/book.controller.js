const express = require('express')
const router = express.Router()

const Book = require('../models/book.model')


router.get('/', (req, res) => {
  Book.find().lean()
    .then(data => {
      res.render("books/index", { books: data })
    })
    .catch(err =>
      console.log('error during fetching operation:\n', err))
})


router.get('/addOrEdit', (req, res) => {
  res.render('books/addOrEdit')
})

router.get('/addOrEdit/:id', (req, res) => {
  Book.findById(req.params.id).lean()
    .then(data => res.render('books/addOrEdit', { book: data }))
    .catch(err =>
      console.log('error while retrieving the record:\n', err))

})

router.post('/addOrEdit', (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear,
    price: req.body.price,
  }
  const { _id } = req.body
  if (_id == '')
    new Book({ ...book }).save()
      .then(data => res.redirect('/books'))
      .catch(err => console.log('error during insertion:\n', err))
  else
    Book.findByIdAndUpdate(_id, book)
      .then(data => res.redirect('/books'))
      .catch(err => console.log('error during update operation:\n', err))
})

router.post('/delete/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(data => res.redirect('/books'))
    .catch(err => console.log('error during deletion:\n', err))
})

module.exports = router