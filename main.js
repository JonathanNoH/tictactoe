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
        // guard against game not started
        if (gameState.getCurrentPlayer() == 0) return;

        // guard against box already filled
        if (array[elem.dataset.box] != '') return;

        // get the current player and then place based on which player
        place(gameState.getCurrentPlayer(), elem.dataset.box);
        gameState.nextPlayer();
        _render();
        
    }


    const _render = () => {
        for (let i = 0; i < squares.length; i++) {
            squares[i].innerText = array[i];
        }
    }

    //public
    const place = (playerName, spot) => {
        //places an X or O. Assumes spot empty.
        if (playerName == "x") {
            array[spot] = 'X';
        }
        if (playerName == 'o') {
            array[spot] = 'O';
        }
    }

    const getArray = () => array;

    const reset = () => {
        array = ['', '', '', '', '', '', '', '', ''];
        _render();
    }

    return {place, getArray, reset};
})()

const gameState = (() => {

    const playerX = Player('x');
    const playerO = Player('o');
    let currentPlayer = Player(0);

    
    //set up start button
    const startGame = () => {
        currentPlayer = playerX;
        gameBoard.reset();
    }
    const startGameButton = document.querySelector('.startButton');
    startGameButton.addEventListener('click', startGame);

    const nextPlayer = () => {
        if (currentPlayer == playerX) {
            currentPlayer = playerO;
        } else if (currentPlayer == playerO) {
            currentPlayer = playerX;
        } else {
            console.log('no game started');
        }
    }

    const getCurrentPlayer = () => {
        return currentPlayer.getName();
    }

    const checkGameOver = () => {

    }

    
    return {startGame, getCurrentPlayer, nextPlayer, checkGameOver, playerX, playerO};
})()
