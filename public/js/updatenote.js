function enableEditMode(noteId) {
    const noteDiv = document.querySelector(`div[data-note-id="${noteId}"]`);
    noteDiv.querySelector('.note-title').readOnly = false;
    noteDiv.querySelector('.note-tagline').readOnly = false;
    noteDiv.querySelector('.note-body').readOnly = false;
    noteDiv.querySelector('.note-pinned').disabled = false;

    noteDiv.querySelector('.editBtn').style.display = 'none';
    noteDiv.querySelector('.saveBtn').style.display = 'inline';
}

function updateNote(noteId) {
    const noteDiv = document.querySelector(`div[data-note-id="${noteId}"]`);
    const updatedNote = {
        title: noteDiv.querySelector('.note-title').value,
        tagline: noteDiv.querySelector('.note-tagline').value,
        body: noteDiv.querySelector('.note-body').value,
        pinned: noteDiv.querySelector('.note-pinned').checked
    };

    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNote)
    }).then(response => {
        response.json().then(data => {
            if (response.status !== 200) {
                console.log('Error updating note: ', data);
            } else {
                console.log('Note updated successfully!');
            }
        });
    }).catch(error => {
        console.log('Error updating note: ', error);
    });

    // Reset edit mode
    noteDiv.querySelector('.note-title').readOnly = true;
    noteDiv.querySelector('.note-tagline').readOnly = true;
    noteDiv.querySelector('.note-body').readOnly = true;
    noteDiv.querySelector('.note-pinned').disabled = true;

    noteDiv.querySelector('.editBtn').style.display = 'inline';
    noteDiv.querySelector('.saveBtn').style.display = 'none';
}
