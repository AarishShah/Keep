//  D:\InstalledSoftwares\mongodb\mongodb\bin\mongod.exe --dbpath=D:\InstalledSoftwares\mongodb\mongodb-data

const express = require('express')
const notesRouter = require('./routers/notes')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(notesRouter)

app.listen
    (port, () => { console.log('Server is up on port ' + port); })