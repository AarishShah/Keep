const noteForm = document.querySelector('#noteForm');
const titleInput = document.querySelector('#title');
const taglineInput = document.querySelector('#tagline');
const bodyInput = document.querySelector('#body');
const pinnedInput = document.querySelector('#pinned');
const messageOne = document.querySelector('#message-1');

noteForm.addEventListener('submit', (e) =>
{
    e.preventDefault(); // prevent the default behavior of refreshing the page

    const noteData = {
        title: titleInput.value,
        tagline: taglineInput.value,
        body: bodyInput.value,
        pinned: pinnedInput.checked
    };

    messageOne.textContent = 'Loading...';

    fetch('http://localhost:3000/notes',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(noteData)
        }
    ).then((response) =>
    {
        response.json().then((data) =>
        {
            if (response.status !== 201) // cross check with the status code in the response
            {
                messageOne.textContent = 'Error: ' + data.message;
                messageOne.textContent = data.error;
                // console.log(data.error);
            }
            else
            {
                messageOne.textContent = 'Note added successfully!';
                // Clear the form
                titleInput.value = '';
                taglineInput.value = '';
                bodyInput.value = '';
                pinnedInput.checked = false;
                // Optionally, redirect or update the page to show the new note
            }
        })
    }).catch((error) =>
    {
        messageOne.textContent = 'Error adding note: ' + error;
    });
})