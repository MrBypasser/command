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
    const input = document.getElementById("input");

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
- word art [text]: Generate ASCII Word Art for the text
- calc [expression]: Evaluate a math expression (e.g., calc 2+2)
- joke: Show a random joke
- countdown [seconds]: Start a countdown
- reverse [text]: Reverse the given text
- shutdown: Display a fake shutdown message
... and more!`;
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

        case "word":
            if (args[1] === "art") {
                const text = args.slice(2).join(' ');
                output = text ? generateWordArt(text) : "Usage: word art [text]";
            } else {
                output = "Unknown command. Did you mean 'word art [text]'?";
            }
            break;

        case "calc":
            try {
                const expression = args.slice(1).join(' ');
                const result = eval(expression); // Simple math evaluation
                output = `Result: ${result}`;
            } catch (error) {
                output = "Invalid math expression. Example: calc 2+2";
            }
            break;

        case "joke":
            output = "Why don't scientists trust atoms? Because they make up everything!";
            break;

        case "countdown":
            const seconds = parseInt(args[1], 10);
            if (!isNaN(seconds)) {
                countdown(seconds);
            } else {
                output = "Invalid countdown duration. Example: countdown 5";
            }
            return;

        case "reverse":
            const textToReverse = args.slice(1).join(' ');
            output = textToReverse.split('').reverse().join('') || "No text provided to reverse!";
            break;

        case "shutdown":
            output = "Shutting down... (Just kidding!)";
            break;

        default:
            output = `"${command}" is not recognized as a valid command. Type 'help' for a list of commands.`;
            break;
    }

    outputDiv.innerHTML += `<div>${output}</div>`;
    outputDiv.scrollTop = outputDiv.scrollHeight; // Scroll to bottom
    resetInput();
}

function resetInput() {
    const inputLine = document.getElementById("inputLine");
    inputLine.innerHTML = '<span class="prompt">C:\\></span><input type="text" id="input" autofocus>';
    document.getElementById("input").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const inputValue = e.target.value.trim();
            e.preventDefault();
            handleCommand(inputValue);
            e.target.value = "";
        }
    });
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

// Word Art Generator
function generateWordArt(text) {
    const chars = text.toUpperCase().split('');
    const artLines = chars.map(char => {
        return char
            ? `
  ${char}   ${char}  
 ${char}${char}${char}${char}${char}  
  ${char}   ${char}  
 ${char}   ${char}  
`.trim()
            : '';
    });
    return artLines.join('\n');
}
