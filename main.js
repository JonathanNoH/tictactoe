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
        if (gameState.getCurrentPlayer() == '') return;

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
        array[spot] = playerName;
    }

    const getArray = () => array;

    const reset = () => {
        array = ['', '', '', '', '', '', '', '', ''];
        _render();
    }

    return {place, getArray, reset};
})()

const gameState = (() => {

    const playerX = Player('X');
    const playerO = Player('O');
    let currentPlayer = Player('');

    
    //set up start button
    const startGame = () => {
        currentPlayer = playerX;
        updatePlayerDisplay();
        gameBoard.reset();
    }
    const startGameButton = document.querySelector('.startButton');
    startGameButton.addEventListener('click', startGame);

    // set up Current Player div
    const getCurrentPlayer = () => {
        return currentPlayer.getName();
    }
    const currentPlayerDisplay = document.querySelector('.playerDisplay');
    const updatePlayerDisplay = () => {
        currentPlayerDisplay.innerText = `${getCurrentPlayer()}`;
    }

    const nextPlayer = () => {
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

    }

    
    return {startGame, getCurrentPlayer, nextPlayer, checkGameOver, updatePlayerDisplay, playerX, playerO};
})()
