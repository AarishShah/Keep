console.log('Client side javascript file is loaded!');

const updateForm = document.querySelector('#updateForm');
const titleInput = document.querySelector('#title');
const taglineInput = document.querySelector('#tagline');
const bodyInput = document.querySelector('#body');
const pinnedInput = document.querySelector('#pinned');
const messageOne = document.querySelector('#message-1');
const noteId = document.querySelector('#noteId').value;



updateForm.addEventListener('submit', (e) =>
{
    e.preventDefault(); // prevent the default behavior of refreshing the page

    const updatedNoteData = {
        title: titleInput.value,
        tagline: taglineInput.value,
        body: bodyInput.value,
        pinned: pinnedInput.checked
    };

    messageOne.textContent = 'Updating note...';

    fetch(`http://localhost:3000/notes/${noteId}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedNoteData)
        }
    ).then((response) =>
    {
        response.json().then((data) =>
        {
            if (response.status !== 200)
            { // 200 OK is the typical success status code for a PATCH request
                messageOne.textContent = 'Error: ' + (data.message || 'Failed to update the note');
            } else
            {
                messageOne.textContent = 'Note updated successfully!';
                // Optionally, redirect or update the page to reflect the updated note
            }
        })
    }).catch((error) =>
    {
        messageOne.textContent = 'Error updating note: ' + error;
    });
});