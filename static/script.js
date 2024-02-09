/* For room.html */

// TODO: Fetch the list of existing chat messages.
// POST to the API when the user posts a new message.
// Automatically poll for new messages on a regular interval.
// Allow changing the name of a room

// Global variables to store room and user information
const roomId = 1; // This should be dynamically set based on the room the user is in
const api_key = "your_api_key"; // This should be obtained from a secure source

// Fetch the list of existing chat messages.
function getMessages() {
    fetch(`/api/messages/${roomId}`, {
        headers: { "X-API-Key": api_key },
    })
        .then((response) => response.json())
        .then((messages) => {
            const messagesContainer = document.getElementById("messages");
            messagesContainer.innerHTML = ""; // Clear existing messages
            messages.forEach((message) => {
                const messageElement = document.createElement("div");
                messageElement.textContent = message.body; // Updated from message.text to message.body
                messagesContainer.appendChild(messageElement);
            });
        })
        .catch((error) => console.error("Error fetching messages:", error));
}

// POST to the API when the user posts a new message.
function postMessage(messageText) {
    fetch(`/api/messages/${roomId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": api_key,
        },
        body: JSON.stringify({ body: messageText }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then((result) => {
            if (result.success) {
                getMessages(); // Refresh messages
            } else {
                console.error("Error posting message:", result.error);
            }
        })
        .catch((error) => console.error("Error posting message:", error));
}

// Automatically poll for new messages on a regular interval.
function startMessagePolling() {
    setInterval(getMessages, 1000); // Poll every second (1000ms)
}

// Allow changing the name of a room
function updateRoomName(newName) {
    fetch("/api/room/name", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": api_key,
        },
        body: JSON.stringify({ room_id: roomId, name: newName }),
    })
        .then((response) => response.json())
        .then((result) => {
            if (!result.success) {
                console.error("Error updating room name:", result.error);
            }
        })
        .catch((error) => console.error("Error updating room name:", error));
}

/* For profile.html */

// TODO: Allow updating the username and password

// Allow updating the username
function updateUsername(newUsername) {
    fetch("/api/user/name", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": api_key,
        },
        body: JSON.stringify({ name: newUsername }),
    })
        .then((response) => response.json())
        .then((result) => {
            if (!result.success) {
                console.error("Error updating username:", result.error);
            }
        })
        .catch((error) => console.error("Error updating username:", error));
}

// Allow updating the password
function updatePassword(newPassword) {
    fetch("/api/user/password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": api_key,
        },
        body: JSON.stringify({ password: newPassword }),
    })
        .then((response) => response.json())
        .then((result) => {
            if (!result.success) {
                console.error("Error updating password:", result.error);
            }
        })
        .catch((error) => console.error("Error updating password:", error));
}
