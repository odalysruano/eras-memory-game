/*----- constants -----*/
const imageLinks = {
    1:  'https://upload.wikimedia.org/wikipedia/en/1/1f/Taylor_Swift_-_Taylor_Swift.png',
    2:  'https://upload.wikimedia.org/wikipedia/en/5/5b/Fearless_%28Taylor%27s_Version%29_%282021_album_cover%29_by_Taylor_Swift.png',
    3:  'https://upload.wikimedia.org/wikipedia/en/5/5b/Taylor_Swift_-_Speak_Now_%28Taylor%27s_Version%29.png',
    4:  'https://upload.wikimedia.org/wikipedia/en/4/47/Taylor_Swift_-_Red_%28Taylor%27s_Version%29.png',
    5:  'https://upload.wikimedia.org/wikipedia/en/d/d5/Taylor_Swift_-_1989_%28Taylor%27s_Version%29.png',
    6:  'https://upload.wikimedia.org/wikipedia/en/f/f2/Taylor_Swift_-_Reputation.png',
    7:  'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Taylor_Swift_-_Lover.png/220px-Taylor_Swift_-_Lover.png',
    8:  'https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png',
    9:  'https://upload.wikimedia.org/wikipedia/en/0/0a/Taylor_Swift_-_Evermore.png',
    10: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png',
}

const boardImgMap = [
    [2, 4, 6, 8, 10],
    [6, 1, 2, 9, 7],
    [4, 5, 3, 10, 1],
    [7, 3, 5, 8, 9],
]

/*----- app's state (variables) -----*/
let gameBoard;
let timeRemaining;
let gameInPlay;
let firstChoice;
let secondChoice;
let cellsClicked;
let gameWon;

/*----- cached html element references -----*/
const boardWrapper = document.querySelector('#board-wrapper');
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const countDown = document.querySelector('#timer');
const message = document.querySelector('#display-message');

/*----- event listeners -----*/
startBtn.addEventListener("click", startGame);
boardWrapper.addEventListener("click", handleMove);
resetBtn.addEventListener("click", initialize);

/*----- functions -----*/
function startGame() {
    gameInPlay = true;
    startBtn.disabled = true;
    // will update to 60 once game is complete
    timeRemaining = 1000;
    startTimer();
}

function startTimer() {
    renderTimeRemaining();
    timeRemaining -= 1;
    if (timeRemaining >= 0) {
        setTimeout(startTimer, 1000);
    }
}

function renderTimeRemaining() {
    countDown.innerText = timeRemaining;
    if (timeRemaining === 0) {
        render();
    }
}

function initialize() {
    gameBoard = [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
    ];
    gameInPlay = false;
    cellsClicked = 0;
    firstChoice = null;
    secondChoice = null;
    gameWon = false;
    timeRemaining = null;
    renderTimeRemaining();
    render();
}

function handleMove(e) {
    if (!gameInPlay) return;
    if (e.target.className !== 'cell') return;
    const col = parseInt(e.target.parentElement.dataset.num, 10);
    const row = parseInt(e.target.dataset.num, 10);
    let selectedCard = gameBoard[row][col];
    if (selectedCard !== null) return;
    if (gameWon) return;
    cellsClicked += 1;
    gameBoard[row][col] = boardImgMap[row][col];
    if (firstChoice !== null) {
        secondChoice = {
            row: row,
            col: col,
            val: boardImgMap[row][col],
        };
    } else {
        firstChoice = {
            row: row,
            col: col,
            val: boardImgMap[row][col],
        };
    }
    render();
    evaluateBoard();
    setTimeout(render, 1750);
}

function render() {
    renderBoard();
    renderMessage();
    if (gameInPlay) {
        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
    if (gameWon || timeRemaining === 0 || gameInPlay) {
        resetBtn.disabled = false;
    } else {
        resetBtn.disabled = true;
    }
}

function renderBoard() {
    const cols = [...boardWrapper.children];
    cols.forEach(function(col) {
        const colIdx = parseInt(col.dataset.num, 10);
        const cells = [...col.children];
        cells.forEach(function(cell) {
            const rowIdx = parseInt(cell.dataset.num, 10);
            const value = gameBoard[rowIdx][colIdx];
            if (value !== null) {
                cell.innerHTML = `<img src=${imageLinks[value]}>`;
            } else {
                cell.innerHTML = "";
            }
        })
    })
}

function evaluateBoard() {
    if (firstChoice !== null && secondChoice !== null) {
        if (firstChoice.val !== secondChoice.val) {
            gameBoard[firstChoice.row][firstChoice.col] = null;
            gameBoard[secondChoice.row][secondChoice.col] = null;
            firstChoice = null;
            secondChoice = null;
            cellsClicked -= 2;
        } else {
            firstChoice = null;
            secondChoice = null;
        }
    } 
    if (cellsClicked === 20) {
        gameWon = true;
    }
}

function renderMessage() {
    if (gameWon) {
        message.innerText = "All matches have been found! You win!";
    } else if (firstChoice !== null && secondChoice !== null && firstChoice.val !== secondChoice.val) {
        message.innerText = "Try again!";
    } else if (cellsClicked > 0) {
        message.innerText = "Pick a square!";
    } else if (timeRemaining === 0) {
        message.innerText = "You ran out of time! You lose!";
    } else {
        message.innerText = "";
    }
}

initialize();
