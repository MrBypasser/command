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
            output = "Available Commands:\n- help\n- date\n- ls\n- echo\n- clear\n- weather\n";
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
