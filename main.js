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
let timer;
let firstChoice;
let secondChoice;
let cellsClicked;
let gameWon;

/*----- cached html element references -----*/
const boardWrapper = document.querySelector('#board-wrapper');
const startBtn = document.querySelector('#start');
const resetBtn = document.querySelector('#reset');
const message = document.querySelector('#display-message');

/*----- event listeners -----*/
startBtn.addEventListener("click", startGame);
boardWrapper.addEventListener("click", handleMove);
resetBtn.addEventListener("click", initialize);

/*----- functions -----*/
// will implement this in a later commit
function startGame() {}

function handleMove(e) {
    if(e.target.className !== 'cell') return;
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
    evaluateBoard();
    render();
}

function initialize() {
    gameBoard = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
    ];
    cellsClicked = 0;
    firstChoice = null;
    secondChoice = null;
    gameWon = false;
    render();
}

initialize();

function render() {
    renderBoard();
    renderMessage();
    if (gameWon !== false || timer === 0) {
        resetBtn.disabled = false;
    } else {
        resetBtn.disabled = true;
    }
}

// will implement these functions in a later commit
function evaluateBoard() {
    console.log("Called the evaluateBoard function!");
}

function renderBoard() {
    console.log("Called the renderBoard function!");
}

function renderMessage() {
    console.log("Called the renderMessage function!");
}
