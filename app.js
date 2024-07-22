let playerText = document.getElementById('playerText');
let restartButton = document.getElementById('restartButton');
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"

let currentPlayer = X_TEXT

let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach((box) => {
        box.addEventListener('click', boxClicked)
    })
}

function boxClicked(click) {
    const id = click.target.id

    if (!spaces[id]) {
        spaces[id] = currentPlayer
        click.target.innerText = currentPlayer

        if (playerHasWon() !== false) {
            playerText = `${currentPlayer} has won!`
            let winningBlocks = playerHasWon()
            winningBlocks.map((box) => boxes[box].style.backgroundColor = winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

restartButton.addEventListener('click', restartGame)

function restartGame() {
    spaces.fill(null)
    boxes.forEach((box) => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })
    playerText = "Tic Tac Toe"
    currentPlayer = X_TEXT
}

startGame()