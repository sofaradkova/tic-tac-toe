const squares = document.querySelectorAll('.square');
const winnerField = document.querySelector('#winner-field');
const startBtn = document.querySelector('#start-game');
const startScreen = document.querySelector('#start-screen');
const gameScreen = document.querySelector('#game-screen');
const winnerScreen = document.querySelector('#winner-screen');
const nameOne = document.querySelector('#name-one');
const nameTwo = document.querySelector('#name-two');
const playerOneTurn = document.querySelector('#player-one');
const playerTwoTurn = document.querySelector('#player-two');
const playerOneTurnName = document.querySelector('#player-one-name');
const playerTwoTurnName = document.querySelector('#player-two-name');
const restartBtn = document.querySelector('#restart');

function GameController() {
    const playerOne = {
        name: (nameOne.value !== "") ? nameOne.value : "Player 1",
        number: 1,
        turn: true
    }
    const playerTwo = {
        name: (nameTwo.value !== "") ? nameTwo.value : "Player 2",
        number: 2,
        turn: false
    }

    playerOneTurnName.innerHTML = playerOne.name;
    playerTwoTurnName.innerHTML = playerTwo.name;

    const rows = [0, 0, 0];
    const columns = [0, 0, 0];
    const diagonals = [0, 0];
    let squaresFilled = 0;

    const playRound = (squareId) => {

        let signToAdd = determineSign();

        const row = determineRow(squareId, signToAdd);
        const column = determineColumn(squareId, signToAdd);
        updateDiagonals(squareId, signToAdd);
        
        document.getElementById(squareId).textContent = signToAdd;
        squaresFilled++;
        determineWinner();
    }

    function determineSign() {
        if (playerOne.turn) {
            playerOne.turn = false;
            playerTwo.turn = true;
            playerOneTurn.style.backgroundColor = "#F2F2F2";
            playerTwoTurn.style.backgroundColor = "#FF002B";
            return 1;
        }
        else {
            playerOne.turn = true;
            playerTwo.turn = false;
            playerOneTurn.style.backgroundColor = "#FF002B";
            playerTwoTurn.style.backgroundColor = "#F2F2F2";
            return 0;
        }
    }

    function determineRow(squareId, signToAdd) {
        if (squareId === 1 || squareId === 2 || squareId === 3) {
            signToAdd === 0 ? rows[0]++ : rows[0]--;
            return 1;
        }
        else if (squareId === 4 || squareId === 5 || squareId === 6) {
            signToAdd === 0 ? rows[1]++ : rows[1]--;
            return 2;
        }
        else {
            signToAdd === 0 ? rows[2]++ : rows[2]--;
            return 3;
        }
    }

    function determineColumn(squareId, signToAdd) {
        if (squareId === 1 || squareId === 4 || squareId === 7) {
            signToAdd === 0 ? columns[0]++ : columns[0]--;
            return 1;
        }
        else if (squareId === 2 || squareId === 5 || squareId === 8) {
            signToAdd === 0 ? columns[1]++ : columns[1]--;
            return 2;
        }
        else if (squareId === 3 || squareId === 6 || squareId === 9) {
            signToAdd === 0 ? columns[2]++ : columns[2]--;
            return 3;
        }
    };

    function updateDiagonals(squareId, signToAdd) {
        if (squareId === 1 || squareId === 5 || squareId === 9) {
            signToAdd === 0 ? diagonals[0]++ : diagonals[0]--;
        }
        if (squareId === 3 || squareId === 5 || squareId === 7) {
            signToAdd === 0 ? diagonals[1]++ : diagonals[1]--;
        }
    }

    function determineWinner(){
        if (rows.includes(-3) || columns.includes(-3) || diagonals.includes(-3)) {
            winnerField.textContent = playerOne.name + " is a winner!";
            gameScreen.style.display = 'none';
            winnerScreen.style.display = 'flex';
        }
        else if (rows.includes(3) || columns.includes(3) || diagonals.includes(3)) {
            winnerField.textContent = playerTwo.name + " is a winner!";
            gameScreen.style.display = 'none';
            winnerScreen.style.display = 'flex';
        }
        else if (squaresFilled === 9) {
            winnerField.textContent = "It's a tie!";
            gameScreen.style.display = 'none';
            winnerScreen.style.display = 'flex';
        }
    };

    function resetGame() {
        for (var i = 0; i < 3; i++) {
            rows[i] = 0;
        }

        for (var i = 0; i < 3; i++) {
            columns[i] = 0;
        }

        for (var i = 0; i < 2; i++) {
            diagonals[i] = 0;
        }

        squaresFilled = 0;
    }

    return {playRound, resetGame};
}

let newGame = new GameController();

startBtn.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'flex';

    playerOneTurn.style.backgroundColor = "#FF002B";

    squares.forEach((square) =>
        square.addEventListener('click', (event) => {
            if (square.textContent === '') {
                newGame.playRound(+square.id);
            }
        })
    );
});

restartBtn.addEventListener('click', () => {
    winnerScreen.style.display = 'none';
    gameScreen.style.display = 'flex';

    playerOneTurn.style.backgroundColor = "#FF002B";
    playerTwoTurn.style.backgroundColor = "#F2F2F2";

    squares.forEach((square) => {
        square.innerHTML = "";
        square.addEventListener('click', (event) => {
            if (square.textContent === '') {
                newGame.playRound(+square.id);
            }
        })
    });

    newGame.resetGame();
});

