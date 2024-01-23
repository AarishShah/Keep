const express = require('express');
const Note = require('../models/note')
const router = new express.Router()

// To create a new note
router.post('/notes', auth, async (req, res) =>
{
    const note = new Note(req.body)
    try
    {
        await note.save();
        res.status(201).send(note);
    } catch (e)
    { res.status(400).send({ statusCode: 500, messgae: "Unable to create note!" }); }

})


// GET /notes - Retrieve all notes with pagination
router.get('/notes', async (req, res) =>
{
    const { page = 1, limit = 6 } = req.query;

    try
    {
        const notes = await Note.find({})
            .sort({ pinned: -1, updatedAt: -1 }) // Sort by pinned and then by updatedAt
            .limit(limit * 1)
            .skip((page - 1) * limit);
        res.send(notes);
    } catch (e)
    {
        res.status(500).send();
    }
});

// reading one task
router.get('/notes/:id', async (req, res) => 
{
    const _id = req.params.id
    try
    {
        const note = await Note.findById(_id)

        if (!note)
        {
            return res.status(404).send()
        }
        res.send(note)

    } catch (e)
    { res.status(500).send({ statusCode: 500, messgae: "Unable to fetch note!" }); }

}
)

// updating a task
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
        // const task = await Task.findById(req.params.id)
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

// deleting a task
router.delete('/notes/:id', async (req, res) =>
{
    try
    {
        // const task = await Task.findByIdAndDelete(req.params.id)
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