const Player = (name) => {
    return {};
}

const gameBoard = (() => {
    let array = ['X', 'O', '', '', 'O', '', 'X', '', 'O'];

    // cache DOM
    const container = document.querySelector('.container');
    const squares = container.children;

    function render() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].innerText = array[i];
        }
    }
    return {render};
})()

