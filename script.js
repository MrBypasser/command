document.getElementById("input").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const inputValue = e.target.value;
        e.preventDefault();
        handleCommand(inputValue);
        e.target.value = "";
    }
});

function handleCommand(command) {
    const outputDiv = document.getElementById("output");
    let output = '';

    switch (command.toLowerCase()) {
        case "help":
            output = `Available Commands:
- help
- date
- ls
- echo
- clear
- weather
- greet [name]
- joke
- fortune
- ascii art [text]
- ping [host]
- countdown [seconds]
- time
- random
- reverse [text]
- calc [expression]
- play music [track]
- say [text]
- alarm [seconds]
- shutdown
... and many more!`;
            break;
        case "date":
            output = `Current Date and Time: ${new Date().toLocaleString()}`;
            break;
        case "ls":
            output = "Documents  Downloads  Pictures  Videos";
            break;
        case "echo":
            output = "This is a cool command prompt!";
            break;
        case "clear":
            outputDiv.innerHTML = '';
            return; // Don't add a new input line if cleared
        case "weather":
            output = "It's always sunny in this terminal!";
            break;
        case "greet":
            output = "Hello, User!";
            break;
        case "joke":
            output = "Why don't skeletons fight each other? They don't have the guts!";
            break;
        case "fortune":
            output = "You will achieve greatness!";
            break;
        case "ascii art hello":
            output = `
  _   _      _ _
 | | | | ___| | | ___
 | |_| |/ _ \ | |/ _ \\
 |  _  |  __/ | | (_) |
 |_| |_|\___|_|_|\___/`;
            break;
        case "ping google.com":
            output = "Pinging google.com... Reply from 142.250.185.78: bytes=32 time=14ms TTL=56";
            break;
        case "countdown 5":
            countdown(5);
            return; // prevent input from being cleared after countdown
        case "time":
            output = `Current time: ${new Date().toLocaleTimeString()}`;
            break;
        case "random":
            output = `Random number: ${Math.floor(Math.random() * 100)}`;
            break;
        case "reverse hello":
            output = "olleh";
            break;
        case "calc 2+2":
            output = `Result: 4`;
            break;
        case "play music happy":
            output = "Now playing: 'Happy' by Pharrell Williams";
            break;
        case "say hello":
            output = "You said: hello";
            break;
        case "alarm 10":
            output = "Alarm set for 10 seconds!";
            setTimeout(() => alert("Time's up!"), 10000);
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

