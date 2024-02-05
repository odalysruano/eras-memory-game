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

/*----- functions -----*/
