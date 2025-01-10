document.getElementById("input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const inputValue = e.target.value.trim();
        e.preventDefault();
        handleCommand(inputValue);
        e.target.value = "";
    }
});

function handleCommand(command) {
    const outputDiv = document.getElementById("output");
    let output = '';

    const args = command.split(' '); // Split the command into parts for complex commands
    const cmd = args[0].toLowerCase(); // The main command

    switch (cmd) {
        case "help":
            output = `Available Commands:
- help: List all commands
- date: Show current date and time
- ls: List files and folders
- echo [text]: Print the provided text
- clear: Clear the terminal screen
- weather: Show a weather message
- matrix: Start a Matrix-style rain effect
- calc [expression]: Evaluate a math expression (e.g., calc 2+2)
- trivia: Start a trivia game
- game: Play a number guessing game
- joke: Show a random joke
- ascii art [text]: Render ASCII art for text
- countdown [seconds]: Start a countdown
- random: Generate a random number
- reverse [text]: Reverse the given text
- alarm [seconds]: Set an alarm
- fortune: Show a random fortune
- shutdown: Display a fake shutdown message
- greet [name]: Greet someone by name
- say [text]: Repeat the text back
... and more to come!`;
            break;

        case "date":
            output = `Current Date and Time: ${new Date().toLocaleString()}`;
            break;

        case "ls":
            output = "Documents  Downloads  Music  Pictures  Videos";
            break;

        case "echo":
            output = args.slice(1).join(' ') || "You didn't provide any text to echo!";
            break;

        case "clear":
            outputDiv.innerHTML = '';
            return; // Don't add a new input line if cleared

        case "matrix":
            startMatrixRain();
            return;

        case "calc":
            try {
                const expression = args.slice(1).join(' ');
                const result = eval(expression); // Simple math evaluation
                output = `Result: ${result}`;
            } catch (error) {
                output = "Invalid math expression. Example: calc 2+2";
            }
            break;

        case "trivia":
            startTriviaGame();
            return;

        case "game":
            startNumberGuessingGame();
            return;

        case "joke":
            output = "Why don't scientists trust atoms? Because they make up everything!";
            break;

        case "ascii":
            if (args[1] === "art") {
                output = `
   _____ _____ _____
  / ____|  __ \\_   _|
 | (___ | |__) || |
  \\___ \\|  ___/ | |
  ____) | |    _| |_
 |_____/|_|   |_____|
`;
            } else {
                output = "Usage: ascii art [text]";
            }
            break;

        case "countdown":
            const seconds = parseInt(args[1], 10);
            if (!isNaN(seconds)) {
                countdown(seconds);
            } else {
                output = "Invalid countdown duration. Example: countdown 5";
            }
            return;

        case "random":
            output = `Random Number: ${Math.floor(Math.random() * 100)}`;
            break;

        case "reverse":
            const textToReverse = args.slice(1).join(' ');
            output = textToReverse.split('').reverse().join('') || "No text provided to reverse!";
            break;

        case "alarm":
            const alarmSeconds = parseInt(args[1], 10);
            if (!isNaN(alarmSeconds)) {
                output = `Alarm set for ${alarmSeconds} seconds!`;
                setTimeout(() => alert("Time's up!"), alarmSeconds * 1000);
            } else {
                output = "Invalid alarm duration. Example: alarm 10";
            }
            break;

        case "fortune":
            output = "Your future looks bright, full of exciting projects!";
            break;

        case "shutdown":
            output = "Shutting down... (Just kidding!)";
            break;

        case "greet":
            const name = args[1] || "stranger";
            output = `Hello, ${name}! Welcome to the terminal.`;
            break;

        case "say":
            output = args.slice(1).join(' ') || "You didn't say anything!";
            break;

        default:
            output = `"${command}" is not recognized as a valid command. Type 'help' for a list of commands.`;
            break;
    }

    outputDiv.innerHTML += `<div>${output}</div>`;
    outputDiv.scrollTop = outputDiv.scrollHeight; // Scroll to bottom
    addNewInputLine();
}

function addNewInputLine() {
    const inputLine = document.createElement('div');
    inputLine.classList.add('input-line');
    inputLine.innerHTML = '<span class="prompt">C:\\></span><input type="text" autofocus>';
    document.querySelector('.terminal').appendChild(inputLine);
    inputLine.querySelector('input').focus();
}

// Countdown function
function countdown(seconds) {
    let remaining = seconds;
    const outputDiv = document.getElementById("output");
    const interval = setInterval(() => {
        outputDiv.innerHTML += `<div>Time remaining: ${remaining} seconds</div>`;
        outputDiv.scrollTop = outputDiv.scrollHeight;
        remaining--;

        if (remaining < 0) {
            clearInterval(interval);
            outputDiv.innerHTML += "<div>Time's up!</div>";
            outputDiv.scrollTop = outputDiv.scrollHeight;
        }
    }, 1000);
}

// Matrix rain effect
function startMatrixRain() {
    const body = document.body;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(columns).fill(1);

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    const interval = setInterval(draw, 50);

    setTimeout(() => {
        clearInterval(interval);
        document.body.removeChild(canvas);
    }, 10000);
}

// Trivia Game
function startTriviaGame() {
    alert("Trivia: What's the capital of France? (Type your answer in the terminal)");
}
