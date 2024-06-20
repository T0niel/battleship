export default (row, col, player) => {
    const boardWrapper = document.createElement('div');
    boardWrapper.classList.add('board-wrapper');
    const header = document.createElement('h1');
    header.textContent = player;
    boardWrapper.appendChild(header);
    
    const board = document.createElement('div');
    board.classList.add('board');
    
    for(let i = 0; i < row; i++){
        const row = document.createElement('div');
        row.classList.add('row');
        row.setAttribute('data-row', i);
        for(let j = 0; j < col; j++){
            const col = document.createElement('div');
            col.classList.add('square');
            col.setAttribute('data-col', j);
            row.appendChild(col);
        }
        board.appendChild(row);
    }

    boardWrapper.appendChild(board);
    
    return boardWrapper;
};