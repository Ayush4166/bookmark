const mongoose = require('mongoose')

const dbUri = 'mongodb+srv://admin:1234@cluster0.bryufox.mongodb.net/books?retryWrites=true&w=majority&appName=Cluster0'


module.exports = () => mongoose.connect(dbUri)