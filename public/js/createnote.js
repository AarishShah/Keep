const noteForm = document.querySelector('#noteForm');
const titleInput = document.querySelector('#title');
const taglineInput = document.querySelector('#tagline');
const bodyInput = document.querySelector('#body');
const pinnedInput = document.querySelector('#pinned');
const messageOne = document.querySelector('#message-1');

noteForm.addEventListener('submit', (e) =>
{
    if (noteForm.getAttribute("data-update-note-id"))
    {
        return;
    }
    
    e.preventDefault();

    const noteData = {
        title: titleInput.value,
        tagline: taglineInput.value,
        body: bodyInput.value,
        pinned: pinnedInput.checked
    };

    messageOne.textContent = 'Loading...';

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(noteData)
    }).then(response =>
    {
        response.json().then(data =>
        {
            if (response.status !== 201)
            {
                messageOne.textContent = 'Error: ' + data.message;
            } else
            {
                messageOne.textContent = 'Note added successfully!';
                titleInput.value = '';
                taglineInput.value = '';
                bodyInput.value = '';
                pinnedInput.checked = false;
            }
        })

        // to refresh the notes
        window.location.reload();

    }).catch(error =>
    {
        messageOne.textContent = 'Error adding note: ' + error;
    });
});
