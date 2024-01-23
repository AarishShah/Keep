const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        title:
        {
            type: String,
            required: true,
            trim: true
        },

        tagline:
        {
            type: String,
            required: true,
            trim: true
        },

        body:
        {
            type: String,
            required: true,
        },

        pinned:
        {
            type: Boolean,
            default: false
        },

        createdAt:
        {
            type: Date,
            default: Date.now
        },

        updatedAt:
        {
            type: Date,
            default: Date.now
        }
    });

noteSchema.pre('save', function (next)
{
    Note = this;
    Note.updatedAt = Date.now();
    next();
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
