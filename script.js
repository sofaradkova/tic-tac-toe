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

    const determineRow = (squareId) => {
        if (squareId === 1 || squareId === 2 || squareId === 3) {
            return 1;
        }
        else if (squareId === 4 || squareId === 5 || squareId === 6) {
            return 2;
        }
        else {
            return 3;
        }
    }
    const determineColumn = (squareId) => {
        if (squareId === 1 || squareId === 4 || squareId === 7) {
            return 1;
        }
        else if (squareId === 2 || squareId === 5 || squareId === 8) {
            return 2;
        }
        else {
            return 3;
        }
    }

    const playRound = (squareId) => {
        const signToAdd = () => {
            if (playerOne.turn) {
                playerOne.turn = false;
                playerTwo.turn = true;
                return "X";
            }
            else {
                playerOne.turn = true;
                playerTwo.turn = false;
                return "O";
            }
        }

        const row = determineRow(squareId);
        const column = determineColumn(squareId);
        
        document.getElementById(squareId).textContent = signToAdd();

    }

    return {playRound};
}

let newGame = new GameController();

const squares = document.querySelectorAll('.square');
squares.forEach((square) =>
    square.addEventListener('click', (event) => {
        if (square.textContent === '') {
            newGame.playRound(square.id);
        }
    })
);