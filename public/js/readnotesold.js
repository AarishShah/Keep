console.log('Client side javascript file for Read Notes page is loaded!');

// Toggle between display and edit view
function toggleEdit(noteId) {
    let displayDiv = document.getElementById('display-' + noteId);
    let editDiv = document.getElementById('edit-' + noteId);

    if (displayDiv.style.display === 'none') {
        displayDiv.style.display = 'block';
        editDiv.style.display = 'none';
    } else {
        displayDiv.style.display = 'none';
        editDiv.style.display = 'block';
    }
}

// Update note
function updateNote(noteId) {
    const updatedNoteData = {
        title: document.getElementById('title-' + noteId).value,
        tagline: document.getElementById('tagline-' + noteId).value,
        body: document.getElementById('body-' + noteId).value
    };

    fetch(`/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNoteData)
    }).then(response => {
        if (response.ok) {
            response.json().then(data => {
                // Update the display view with new data and toggle back
                document.querySelector(`#display-${noteId} h2`).textContent = data.title;
                document.querySelector(`#display-${noteId} p:nth-of-type(1)`).textContent = data.tagline;
                document.querySelector(`#display-${noteId} p:nth-of-type(2)`).textContent = data.body;
                toggleEdit(noteId);
            });
        } else {
            console.error('Failed to update note');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}
