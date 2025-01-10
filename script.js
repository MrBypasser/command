document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("input");
    const outputDiv = document.getElementById("output");

    inputField.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const inputValue = inputField.value.trim();
            e.preventDefault();
            if (inputValue !== "") {
                handleCommand(inputValue);
                inputField.value = ""; // Clear the input field after handling the command
            }
        }
    });

    function handleCommand(command) {
        const args = command.split(' ');
        const cmd = args[0].toLowerCase();
        let output = '';

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

        appendOutput(output);
    }

    function appendOutput(output) {
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
});
