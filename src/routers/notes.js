const express = require('express');
const Note = require('../models/note');
const router = new express.Router()

// To create a new note
router.post('/notes', async (req, res) =>
{
    const note = new Note(req.body)
    try
    {
        await note.save();
        return res.status(201).send(note);
    } catch (e)
    {

        return res.status(400).render('error', { statusCode: 400, messgae: "Unable to create note!" });
    }

})


// GET /notes - Retrieve all notes with pagination
router.get('/notes', async (req, res) =>
{
    const { page = 1, limit = 6 } = req.query;

    try
    {
        const notes = await Note.find({}) // Find all notes
            .sort({ pinned: -1, updatedAt: -1 }) // Sort by pinned and then by updatedAt
            .limit(limit * 1) // implicit conversion of limit to number, we could have used parseInt(limit) as well
            .skip((page - 1) * limit); // (page - 1) - pages already displayed, eg if page = 4, then 3 pages are already displayed, so skip 3 pages. {(3 pages) * (6 notes) per page = (18 notes)} already displayed, so skip 18 notes.
        // res.send(notes);
        res.status(201).render('notes', { notes: notes, title: "All notes" });
    } catch (e)
    {
        console.log(e);
        // res.status(400).send({ statusCode: 400, messgae: "Unable to create note!" });
        res.status(500).render('error', { statusCode: 500, message: "Unable to fetch notes!" });
    }
});

// reading one note
router.get('/notes/:id', async (req, res) => 
{
    const _id = req.params.id
    try
    {
        const note = await Note.findById(_id)

        if (!note)
        {
            return res.status(404).send({ statusCode: 404, messgae: "Note not found!" })
        }
        res.send(note)

    } catch (e)
    { res.status(500).send({ statusCode: 500, messgae: "Unable to fetch note!" }); }

}
)

// updating a note
router.patch('/notes/:id', async (req, res) =>
{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'tagline', 'body', 'pinned']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation)
    {
        return res.status(404).send({ error: 'Invalid updates' })
    }

    try
    {
        const note = await Note.findById(req.params.id);

        if (!note)
        {
            return res.status(404).send({ statusCode: 404, messgae: "Note not found!" })
        }

        updates.forEach((update) => note[update] = req.body[update])
        await note.save()

        res.send(note)
    }
    catch (e)
    {
        res.status(400).send({ statusCode: 400, messgae: "Unable to update note!" })
    }
}
)

// deleting a note
router.delete('/notes/:id', async (req, res) =>
{
    try
    {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note)
        {
            return res.status(404).send({ statusCode: 404, messgae: "Note not found!" })
        }
        res.send(note)
    } catch (e)
    {
        res.status(500).send({ statusCode: 500, messgae: "Unable to delete note!" })
    }
}
)

module.exports = router

/* Test data

{
    "title": "Meeting Notes",
    "tagline": "Notes from the client meeting on Jan 24th",
    "body": "Discussed project timelines, budget constraints, and initial design ideas. Action items include...",
    "pinned": true, // false by default
    "_id": "65b012848d2e17f8cf22823d",
    "createdAt": "2024-01-23T19:24:52.226Z",
    "updatedAt": "2024-01-23T19:24:52.226Z",
    "__v": 0
}

*/