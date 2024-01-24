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

app.get('/addnote', (req, res) => {
    res.render('addnote', {
        title: 'Add a New Note'
    });
});


// app.get('', (req, res) =>
// {
//     res.render('index', {
//         title: 'Notes',
//         name: 'Aarish Shah'
//     })
// })

// app.get('/about', (req, res) =>
// {
//     res.render('about', {
//         title: 'About Me',
//         name: 'Aarish Shah'
//     })
// })

// app.get('/help', (req, res) =>
// {
//     res.render('help', {
//         helpText: 'This is some helpful text.',
//         title: 'Help',
//         name: 'Aarish Shah'
//     })
// })

// app.get('/notes', async (req, res) => {
//     try {
//         // Fetch notes from your API
//         const response = await fetch('http://localhost:3000/notes');
//         const notes = await response.json();
//         console.log(notes);

//         // Render your Handlebars template and pass the notes data
//         res.render('notes', {
//             title: 'My Notes',
//             notes: notes
//         });
//     } catch (error) {
//         res.status(500).send({ message: 'Unable to fetch notes.' });
//     }
// });

// app.get('*', (req, res) => // '*' is a wild card character. It means match anything that hasn't been matched so far. Thus it must come last.
// {
//     res.render('404', {
//         title: '404',
//         name: 'Aarish Shah',
//         errorMessage: 'Page not found.'
//     }

//     )
// })



app.listen
    (port, () => { console.log('Server is up on port ' + port); })