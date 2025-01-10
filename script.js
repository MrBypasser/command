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

    const args = command.split(' ');
    const cmd = args[0].toLowerCase();

    switch (cmd) {
        case "help":
            output = `Available Commands:
- help: List all commands
- word art [text]: Generate fancy word art
- clear: Clear the terminal screen
- echo [text]: Print the provided text
- matrix: Start a Matrix-style rain effect`;
            break;

        case "clear":
            outputDiv.innerHTML = '';
            return;

        case "word":
            if (args[1] === "art") {
                const text = args.slice(2).join(' ');
                if (text) {
                    output = generateFancyWordArt(text);
                } else {
                    output = "Usage: word art [text]";
                }
            } else {
                output = "Unknown command. Did you mean 'word art [text]'?";
            }
            break;

        case "matrix":
            startMatrixRain();
            return;

        default:
            output = `"${command}" is not recognized. Type 'help' for available commands.`;
            break;
    }

    outputDiv.innerHTML += `<div>${output}</div>`;
    outputDiv.scrollTop = outputDiv.scrollHeight; // Scroll to bottom
}

function generateFancyWordArt(text) {
    const alphabet = {
        A: "╔═╗\n║║║\n╚═╝",
        B: "╔╗╗\n║║║\n╚╝╝",
        C: "╔══\n║\n╚══",
        D: "╔╗╗\n║║║\n╚╝╝",
        E: "╔══\n║══\n╚══",
        F: "╔══\n║══\n╚",
        G: "╔══╗\n║╔╗║\n╚══╝",
        H: "╔╗╔\n║║║\n╚╝╚",
        I: "═══\n ║ \n═══",
        J: " ══╗\n  ║\n══╝",
        K: "╔╗╔\n║║║\n╚╝╚",
        L: "╔\n║\n╚══",
        M: "╔╗╗╔\n║║║║\n╚╝╚╝",
        N: "╔╗╗╗\n║║║║\n╚╝╚╝",
        O: "╔══╗\n║║║║\n╚══╝",
        P: "╔══╗\n║══╝\n╚",
        Q: "╔══╗\n║║║║\n╚══╗",
        R: "╔══╗\n║══╝\n╚╗",
        S: "╔══\n╚══╗\n══╝",
        T: "═══╗\n  ║\n  ║",
        U: "╔╗╗╗\n║║║║\n╚══╝",
        V: "╔╗╗\n║║║\n ╚╝",
        W: "╔╗╗╗\n║║║║\n╚╝╚╝",
        X: "╗╔╗\n ║ \n╝╚╝",
        Y: "╗╔╗\n ║ \n ║",
        Z: "══╗\n ╔ \n══╝",
        " ": "     ",
    };

    const lines = ["", "", ""];
    text.toUpperCase().split("").forEach((char) => {
        const art = alphabet[char] || char;
        const artLines = art.split("\n");
        for (let i = 0; i < artLines.length; i++) {
            lines[i] += artLines[i] + "  ";
        }
    });
    return lines.join("\n");
}

function startMatrixRain() {
    const body =
