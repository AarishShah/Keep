const express = require('express')
const path = require('path');
const hbs = require('hbs')
require('./db/mongoose') // to connect mongose to the database

const notesRouter = require('./routers/notes')

const app = express()
const port = process.env.PORT || 3000

// Defined paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // to customize the name from 'views' to 'templates'
hbs.registerPartials(partialsPath); // to register partials
app.use(express.static(publicDirectoryPath))

app.use(express.json())
app.use(notesRouter)
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
    next()
})
app.listen
    (port, () => { console.log('Server is up on port ' + port); })
