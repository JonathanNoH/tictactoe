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
            console.log(elem.dataset.box);
            // *** get the current player and then place based on which player
            place(gameState.getCurrentPlayer(), elem.dataset.box);
            render();
        })
    })

    function place(playerName, spot) {
        if (playerName == "x") {
            array[spot] = 'X';
        }
        if (playerName == 'o') {
            array[spot] = 'O';
        }
    }

    const render = () => {
        for (let i = 0; i < squares.length; i++) {
            squares[i].innerText = array[i];
        }
    }

    const getArray = () => array;

    return {place, getArray};
})()

const gameState = (() => {

    const playerX = Player('x');
    const playerO = Player('o');

    

    const getCurrentPlayer = () => {
        return playerO.getName();
    }

    
    return {getCurrentPlayer, playerX, playerO};
})()
