const words = ["javascript", "html", "css", "python", "java", "ruby", "swift", "php"];
let word = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let hangmanImage = 0;


// A função displayWord mostra a palavra oculta, substituindo as letras não adivinhadas por underscores.
function displayWord() {
    const display = word
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');

    document.getElementById("word").textContent = display;
}

//A função displayHangman exibe diferentes estágios do enforcado com base no número de letras erradas adivinhadas.
function displayHangman() {
    document.getElementById("hangman").style.backgroundImage = `url('hangman_${hangmanImage}.png')`;
}

function handleButtonClick(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!word.includes(letter)) {
            hangmanImage++;
        }
        displayWord();
        displayHangman();
        checkGameStatus();
    }
}

// A função displayLetters cria botões para cada letra do alfabeto, permitindo ao jogador escolher letras para adivinhar.
function displayLetters() {
    const lettersDiv = document.getElementById("letters");
    lettersDiv.innerHTML = "";
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleButtonClick(letter));
        lettersDiv.appendChild(button);
    }
}

// A função checkGameStatus verifica se o jogador ganhou ou perdeu, exibindo alertas apropriados.
function checkGameStatus() {
    if (hangmanImage === 6) { //Tem 7 tentatívas, ou seja, apenas 7 cliques nas palavras.
        alert("Você perdeu! A palavra era: " + word);
        resetGame();
    } else if (!document.getElementById("word").textContent.includes("_")) {
        alert("Parabéns! Você acertou a palavra!");
        resetGame();
    }
}

// A função resetGame reinicia o jogo, escolhendo uma nova palavra aleatória e reiniciando as variáveis.
function resetGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    hangmanImage = 0;
    displayWord();
    displayHangman();
    displayLetters();
}

// Inicializa o jogo
displayWord();
displayHangman();
displayLetters();
