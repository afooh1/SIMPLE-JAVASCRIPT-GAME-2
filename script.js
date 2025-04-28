(function loadEmailJSScript() {
    const script = document.createElement('script');
    script.src = "https://cdn.emailjs.com/dist/email.min.js";
    script.onload = () => {
        emailjs.init("YOUR_USER_ID");
        console.log("EmailJS SDK loaded and initialized.");
    };
    script.onerror = () => {
        console.error("Failed to load EmailJS SDK.");
    };
    document.body.appendChild(script);
})();

document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (validateLogin(username, password)) {
        showPopup("Login successful! Welcome, " + username + "!");
        clearForm();
    }
});

document.getElementById('forgotPasswordLink')?.addEventListener('click', function() {
    document.getElementById('forgotPasswordPopup').style.display = 'flex';
});

document.getElementById('submitForgotEmail')?.addEventListener('click', function() {
    const email = document.getElementById('forgotEmail').value.trim();
    if (validateEmail(email)) {
        showPopup("An email has been sent to reset your password.");
        document.getElementById('forgotPasswordPopup').style.display = 'none';
    } else {
        showPopup("Please enter a valid email address.");
    }
});

document.getElementById('signUpLink')?.addEventListener('click', function() {
    document.getElementById('signUpPopup').style.display = 'flex';
});

document.getElementById('submitSignUp')?.addEventListener('click', function() {
    const email = document.getElementById('signUpEmail').value.trim();
    const password = document.getElementById('signUpPassword').value.trim();
    if (validateEmail(email) && password) {
        showPopup("Welcome to the team!");
        document.getElementById('signUpPopup').style.display = 'none';
    } else {
        showPopup("Please fill in all fields with valid information.");
    }
});

// Guess the Number Game
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Function to save game history
function saveGameHistory(guess, attempts) {
    let history = JSON.parse(localStorage.getItem("gameHistory")) || [];

    // Save the current game result
    history.push({
        guess: guess,
        attempts: attempts
    });

    // Store the updated history back in localStorage
    localStorage.setItem("gameHistory", JSON.stringify(history));
}

document.getElementById('guessForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const userGuess = parseInt(document.getElementById('guessInput').value, 10);
    const gameMessage = document.getElementById('gameMessage');
    attempts++;

    if (userGuess === randomNumber) {
        gameMessage.textContent = `🎉 Congratulations! You guessed it in ${attempts} attempts.`;
        gameMessage.classList.add('success-message');
        document.getElementById('restartGame').style.display = 'block';
        
        // Save game history when the user guesses the correct number
        saveGameHistory(userGuess, attempts);
    } else if (userGuess < randomNumber) {
        gameMessage.textContent = " Too low. Try again!";
        gameMessage.classList.remove('success-message');
    } else {
        gameMessage.textContent = " Too high. Try again!";
        gameMessage.classList.remove('success-message');
    }
});

document.getElementById('restartGame')?.addEventListener('click', function() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guessInput').value = '';
    document.getElementById('gameMessage').textContent = '';
    this.style.display = 'none';
});

function validateLogin(username, password) {
    return username !== "" && password !== "";
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function showPopup(message) {
    const popup = document.getElementById("popupMessage");
    const popupText = document.getElementById("popupText");
    popupText.textContent = message;
    popup.style.display = "flex";

    document.getElementById("closePopup").addEventListener("click", () => {
        popup.style.display = "none";
    });
}

function clearForm() {
    document.getElementById('loginForm')?.reset();
}

 // Function to display game history
 function displayGameHistory() {
    const historyList = document.getElementById("history-list");
    const history = JSON.parse(localStorage.getItem("gameHistory")) || [];

    // Debugging output to see what history is fetched
    console.log('Fetched game history:', history);

    historyList.innerHTML = '';

    if (history.length === 0) {
        historyList.innerHTML = '<tr><td colspan="2">No history found.</td></tr>';
    } else {
        history.forEach((game, index) => {
            const row = document.createElement("tr");
            const guessCell = document.createElement("td");
            const attemptsCell = document.createElement("td");

            guessCell.textContent = game.guess;
            attemptsCell.textContent = game.attempts;

            row.appendChild(guessCell);
            row.appendChild(attemptsCell);
            historyList.appendChild(row);
        });
    }
}

// Call the function to display history when the page loads
window.onload = displayGameHistory;