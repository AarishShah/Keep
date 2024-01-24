document.body.addEventListener('click', function (event) {
    if (event.target.classList.contains('editBtn')) {
        const noteId = event.target.parentElement.getAttribute('data-note-id');
        populateFormWithNoteData(noteId);
    }
});

function populateFormWithNoteData(noteId) {
    // Find the note element and its data
    const noteElement = document.querySelector(`div[data-note-id="${noteId}"]`);
    const title = noteElement.querySelector('h2').textContent;
    const tagline = noteElement.querySelector('p').textContent;
    const body = noteElement.querySelector('div').textContent;

    // Populate form fields
    titleInput.value = title;
    taglineInput.value = tagline;
    bodyInput.value = body;
    // ... include pinned status if applicable

    // Change form to update mode
    noteForm.setAttribute('data-update-note-id', noteId);
    noteForm.querySelector('button[type="submit"]').textContent = 'Update Note';
}

noteForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Check if we are in update mode
    const updateNoteId = noteForm.getAttribute('data-update-note-id');
    if (updateNoteId) {
        const updatedNoteData = {
            title: titleInput.value,
            tagline: taglineInput.value,
            body: bodyInput.value,
            // ... include pinned status if applicable
        };

        fetch(`http://localhost:3000/notes/${updateNoteId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedNoteData)
        }).then(response => {
            if (response.status !== 200) {
                console.error('Error updating note');
            } else {
                // Update the note in the UI
                const noteElement = document.querySelector(`div[data-note-id="${updateNoteId}"]`);
                noteElement.querySelector('h2').textContent = updatedNoteData.title;
                noteElement.querySelector('p').textContent = updatedNoteData.tagline;
                noteElement.querySelector('div').textContent = updatedNoteData.body;
                // ... update pinned status if applicable

                // Reset form
                titleInput.value = '';
                taglineInput.value = '';
                bodyInput.value = '';
                // ... reset pinned status if applicable
                noteForm.removeAttribute('data-update-note-id');
                noteForm.querySelector('button[type="submit"]').textContent = 'Add Note';
            }
        }).catch(error => {
            console.error('Error updating note:', error);
        });
    }
});
