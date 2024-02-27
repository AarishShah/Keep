document.body.addEventListener('click', function (event) {
    if (event.target.classList.contains('deleteBtn')) {
        const noteId = event.target.parentElement.getAttribute('data-note-id');
        deleteNote(noteId);
    }
});

function deleteNote(noteId) {
    fetch(`/${noteId}`, {
        method: 'DELETE',
    }).then(response => {
        if (response.status !== 200) {
            console.error('Error deleting note');
        } else {
            // Remove the note from the UI
            const noteElement = document.querySelector(`div[data-note-id="${noteId}"]`);
            noteElement.remove();
        }
    }).catch(error => {
        console.error('Error deleting note:', error);
    });
}
