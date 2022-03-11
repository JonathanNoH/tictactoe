const Player = (name) => {
    const getName = () => name;
    
    return {getName};
}

const gameBoard = (() => {
    let array = ['', '', '', '', '', '', '', '', ''];

    // cache DOM
    const container = document.querySelector('.container');
    const squares = container.querySelectorAll('div');

    // add eventlisteners to each button
    squares.forEach((elem) => {
        elem.addEventListener('click', () => {
            _fillBox(elem);
        })
    })

    //private
    const _fillBox = (elem) => {
        // guard against game not going
        if (!gameState.getGameStatus()) return;

        // guard against box already filled
        if (array[elem.dataset.box] != '') return;

        // get the current player and then place based on which player
        _place(gameState.getCurrentPlayer(), elem.dataset.box);
        gameState.nextPlayer();
        _render();
        gameState.checkGameOver();
    }


    const _render = () => {
        for (let i = 0; i < squares.length; i++) {
            squares[i].innerText = array[i];
        }
    }

    
    const _place = (playerName, spot) => {
        //places an X or O. Assumes spot empty.
        array[spot] = playerName;
    }

    //public

    const getArray = () => array;

    const reset = () => {
        array = ['', '', '', '', '', '', '', '', ''];
        _render();
    }

    return {getArray, reset};
})()

const gameState = (() => {

    //set up players
    const playerX = Player('X');
    const playerO = Player('O');
    const playerNull = Player('');
    let isGameGoing = false;
    let currentPlayer = playerNull;

    //set up DOM
    const winnerDisplay = document.querySelector('.winnerDisplay');
    const startGameButton = document.querySelector('.startButton');
    const currentPlayerDisplay = document.querySelector('.playerDisplay');
    const winnerElement = document.querySelector('.winner');
    
    //private functions
    const _showWinnerDisplay = () => {
        winnerDisplay.classList.remove('hidden');
    }
    const _hideWinnerDisplay = () => {
        winnerDisplay.classList.add('hidden');
    }

    const _getWinner = () => {
        //checks if game is over and returns 'O' or 'X' if there is a winner
        let array = gameBoard.getArray();

        //create possible lines for winning
        let row1 = array.slice(0,3);
        let row2 = array.slice(3,6);
        let row3 = array.slice(6,9);
        let col1 = [array[0], array[3], array[6]];
        let col2 = [array[1], array[4], array[7]];
        let col3 = [array[2], array[5], array[8]];
        let dia1 = [array[0], array[4], array[8]];
        let dia2 = [array[2], array[4], array[6]];
        let lines = [row1, row2, row3, col1, col2, col3, dia1, dia2];

        function isWinningLine(line) {
            //line can't be winning if first spot is blank
            if (line[0] == '') return false;
            //line is winning if first spot not blank and line matches
            return ((line[0] == line[1]) && (line[0] == line[2]));
        }

        for (let line of lines) {
            //go through each line checking if it is winning
            if (isWinningLine(line)) {
                return line[0];
            }
        } 
        return false;
    }

    const _gameOver = (winner) => {
        //does game over things
        _showWinnerDisplay();
        winnerElement.innerText = winner;
        currentPlayer = playerNull;
        updatePlayerDisplay();
        isGameGoing = false;
    }


    const getGameStatus = () => {
        return isGameGoing;
    }

    //set up start button
    const startGame = () => {
        isGameGoing = true;
        _hideWinnerDisplay();
        currentPlayer = playerX;
        updatePlayerDisplay();
        gameBoard.reset();
    }
    startGameButton.addEventListener('click', startGame);

    // set up Current Player div
    const getCurrentPlayer = () => {
        return currentPlayer.getName();
    }
    const updatePlayerDisplay = () => {
        currentPlayerDisplay.innerText = `${getCurrentPlayer()}`;
    }

    const nextPlayer = () => {
        //changes player to other player
        if (currentPlayer == playerX) {
            currentPlayer = playerO;
        } else if (currentPlayer == playerO) {
            currentPlayer = playerX;
        } else {
            console.log('no game started');
        }
        updatePlayerDisplay();
    }

    const checkGameOver = () => {
        let winner = _getWinner();
        if (!winner) return;
        _gameOver(winner);
    }

    
    return {getGameStatus, startGame, getCurrentPlayer, nextPlayer, checkGameOver, updatePlayerDisplay};
})()
