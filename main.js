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
            _eventFunction(elem);
        })
    })

    //private
    const _eventFunction = (elem) => {
        if (gameState.getCurrentPlayer() == 0) return;
        // *** get the current player and then place based on which player
        place(gameState.getCurrentPlayer(), elem.dataset.box);
        _render();
        gameState.nextPlayer();
    }


    const _render = () => {
        for (let i = 0; i < squares.length; i++) {
            squares[i].innerText = array[i];
        }
    }

    //public
    const place = (playerName, spot) => {
        if (playerName == "x") {
            array[spot] = 'X';
        }
        if (playerName == 'o') {
            array[spot] = 'O';
        }
    }

    const getArray = () => array;

    return {place, getArray};
})()

const gameState = (() => {

    const playerX = Player('x');
    const playerO = Player('o');
    let currentPlayer = Player(0);

    const startGame = () => {
        currentPlayer = playerX;
    }

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
