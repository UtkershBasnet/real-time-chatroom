let username = localStorage.getItem('username');
if (!username) {
    username = prompt("Enter your username:");
    if (username && username.trim() !== '') {
        localStorage.setItem('username', username);
    } else {
        alert("Please enter a valid username.");
        location.reload();
    }
}

let messageInput = document.getElementById('message-input');
let sendButton = document.getElementById('send-button');
let messageDisplay = document.getElementById('messages');
let changeUsernameButton = document.getElementById('change-username');  // Get the change username button

// Function to auto-scroll the chat container to the bottom
function scrollToBottom() {
    messageDisplay.scrollTop = messageDisplay.scrollHeight;
}

// Function to add a message to the chat window
function addMessage(message) {
    let messageElement = document.createElement('div');
    messageElement.innerText = `${message.username}: ${message.text}`;
    
    if (message.username === username) {
        messageElement.classList.add('user');  // Add CSS class for user messages
    }

    messageDisplay.appendChild(messageElement);
    scrollToBottom();
}

// Listen for messages in localStorage (for multi-tab)
window.addEventListener('storage', function(event) {
    if (event.key === 'chatMessages') {
        let messages = JSON.parse(event.newValue);
        messageDisplay.innerHTML = '';
        messages.forEach(addMessage);
    }
});




// Clear all local storage and restart the app
document.getElementById('clear-chat').addEventListener('click', function() {
    localStorage.clear();  // Clear all stored data
    document.getElementById('messages').innerHTML = '';  // Clear the displayed messages
});


// Send message on button click
sendButton.addEventListener('click', function() {
    let messageText = messageInput.value.trim();
    if (messageText === '') return;

    let message = {
        username: username,
        text: messageText
    };

    messageInput.value = '';

    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));

    addMessage(message);
});

// Load previous messages on page load
let storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
storedMessages.forEach(addMessage);

// Change username functionality
changeUsernameButton.addEventListener('click', function() {
    let newUsername = prompt("Enter your new username:");
    
    if (newUsername && newUsername.trim() !== '') {
        username = newUsername;  // Update the current username
        localStorage.setItem('username', username);  // Store the new username in localStorage
        alert(`Your username has been updated to ${username}`);
        location.reload();  // Reload the page to update the displayed username
    } else {
        alert("Please enter a valid username.");
    }
});
