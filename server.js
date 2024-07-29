const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')



//local imports
const connectDb = require('./db')
const bookRoutes = require('./controllers/book.controller')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


//routing
app.use('/books', bookRoutes)

//configure view engine
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
  extname: "hbs",//index.hbs
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: 'mainLayout.hbs'
}))
app.set('view engine', '.hbs')


connectDb()
  .then(data => {
    console.log('db connection succeeded.');
    app.listen(3000, () => {
      console.log('server started at 3000.');
    }).on('error', err =>
      console.log('server ignition failed:\n', err))
  })
  .catch(err => console.log('error in connecting db\n:', err))