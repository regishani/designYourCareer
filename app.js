const path = require ('path')
const express = require ('express')
const dotenv = require ('dotenv')
const mongoose = require("mongoose")
const morgan = require ('morgan')
const exphbs = require('express-handlebars')
const connectDB = require ('./config/db')

dotenv.config =({path:'./config/config.env' })
connectDB()
const app = express()
// logging
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}


// handlebars
app.engine(
    '.hbs',
    exphbs.engine({
      defaultLayout: 'main',
      extname: '.hbs',
    })
  )
app.set('view engine', '.hbs')

//static folder
app.use(express.static(path.join(__dirname, 'public')))

//router

app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 3000
app.listen (
    PORT,
    console.log(`Server is runningin ${process.env.NODE.ENV} mode on ${PORT}`)
)