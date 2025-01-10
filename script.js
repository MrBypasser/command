document.getElementById("input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const inputValue = e.target.value.trim();
        e.preventDefault();
        handleCommand(inputValue);
        e.target.value = "";
    }
});

let awaitingWordArtStyle = false;
let wordArtText = '';

function handleCommand(command) {
    const outputDiv = document.getElementById("output");
    let output = '';

    const args = command.split(' ');
    const cmd = args[0].toLowerCase();

    // Handle word art style selection
    if (awaitingWordArtStyle) {
        const styleOption = command.trim().toLowerCase();
        outputDiv.innerHTML += `<div>${generateWordArt(wordArtText, styleOption)}</div>`;
        awaitingWordArtStyle = false;
        wordArtText = '';
        resetInput();
        return;
    }

    switch (cmd) {
        case "help":
            output = `Available Commands:
- help: List all commands
- word art [text]: Generate big word art. Choose from four styles (shown after command).
- clear: Clear the terminal screen
- echo [text]: Print the provided text
- matrix: Start a Matrix-style rain effect
... and more!`;
            break;

        case "clear":
            outputDiv.innerHTML = '';
            return;

        case "word":
            if (args[1] === "art") {
                wordArtText = args.slice(2).join(' ');
                if (wordArtText) {
                    output = `
Choose a style for "${wordArtText}":
[A] Style 1:
${generateWordArtPreview('ABC', 'style1')}

[B] Style 2:
${generateWordArtPreview('ABC', 'style2')}

[C] Style 3:
${generateWordArtPreview('ABC', 'style3')}

[D] Style 4:
${generateWordArtPreview('ABC', 'style4')}
Type 'A', 'B', 'C', or 'D' to choose a style.
                    `;
                    awaitingWordArtStyle = true;
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

function generateWordArt(text, style) {
    switch (style) {
        case 'a':
        case 'style1':
            return text.toUpperCase()
                .split('')
                .map(char => `  ${char}   ${char}  \n ${char}${char}${char}${char}${char} \n  ${char}   ${char} `)
                .join('\n');

        case 'b':
        case 'style2':
            return text.toUpperCase()
                .split('')
                .map(char => `###   ###\n####  ####\n###   ###\n##########`)
                .join('\n');

        case 'c':
        case 'style3':
            return text.toUpperCase()
                .split('')
                .map(char => `** ${char} **\n** ${char} **\n***${char}***`)
                .join('\n');

        case 'd':
        case 'style4':
            return text.toUpperCase()
                .split('')
                .map(char => `==${char}==\n=${char}===${char}=\n==${char}==`)
                .join('\n');

        default:
            return `Invalid style selected. Use 'A', 'B', 'C', or 'D'.`;
    }
}

function generateWordArtPreview(text, style) {
    return generateWordArt(text, style);
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

