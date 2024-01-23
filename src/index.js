const express = require('express')
const path = require('path');
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

app.get('', (req, res) =>
{
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) =>
{
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) =>
{
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/notes', (req, res) =>
{
    if (!req.query.address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>
    {
        if (error)
        {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) =>
        {
            if (error)
            {
                return res.send({ error })
            }

            res.send(
                {
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
        })
    })
})


app.get('/products', (req, res) =>
{
    if (!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>
{
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => // '*' is a wild card character. It means match anything that hasn't been matched so far. Thus it must come last.
{
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    }

    )
})

app.use(express.json())
app.use(notesRouter)

app.listen
    (port, () => { console.log('Server is up on port ' + port); })