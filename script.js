const squares = document.querySelectorAll('.square');
const winnerField = document.querySelector('#winner-field');

function GameController() {
    const playerOne = {
        name: 'Player One',
        number: 1,
        turn: true
    }
    const playerTwo = {
        name: 'Player Two',
        number: 2,
        turn: false
    }

    const rows = [0, 0, 0];
    const columns = [0, 0, 0];
    const diagonals = [0, 0];

    const playRound = (squareId) => {

        let signToAdd = determineSign();

        const row = determineRow(squareId, signToAdd);
        const column = determineColumn(squareId, signToAdd);
        
        document.getElementById(squareId).textContent = signToAdd;
        determineWinner();
    }

    function determineSign() {
        if (playerOne.turn) {
            playerOne.turn = false;
            playerTwo.turn = true;
            return 1;
        }
        else {
            playerOne.turn = true;
            playerTwo.turn = false;
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

    function determineWinner(){
        if (rows.includes(-3) || columns.includes(-3) || diagonals.includes(-3)) {
            winnerField.textContent = "Player one is a winner";
        }
        else if (rows.includes(3) || columns.includes(3) || diagonals.includes(3)) {
            winnerField.textContent = "Player two is a winner";
        }
    };

    return {playRound};
}

let newGame = new GameController();

squares.forEach((square) =>
    square.addEventListener('click', (event) => {
        if (square.textContent === '') {
            newGame.playRound(+square.id);
        }
    })
);