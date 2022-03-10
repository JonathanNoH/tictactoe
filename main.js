const Player = (name) => {

    
    return {'name' : name};
}


const playerX = Player('x');
const playerO = Player('o');

const gameBoard = (() => {
    let array = ['', '', '', '', '', '', '', '', ''];

    // cache DOM
    const container = document.querySelector('.container');
    const squares = container.querySelectorAll('div');
    squares.forEach((elem) => {
        elem.addEventListener('click', () => {
            console.log(elem.dataset.box);
            // ***
        })
    })


    function place(player, spot) {
        if (player.name == "x") {
            array[spot] = 'X';
        }
        if (player.name == 'o') {
            array[spot] = 'O';
        }
        render();
    }

    function render() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].innerText = array[i];
        }
    }

    function checkState() {

    }
    return {place};
})()

const gameFlow = (() => {
    
    

    return {};
})()
