import hitImage from '../../imgs/hit.png';
import missImage from '../../imgs/miss.png';
import gameboard from '../../js/modules/gameboard';
import ship from '../../js/modules/ship';

const body = document.querySelector('body');

export function screenTimeout(seconds) {
  body.classList.add('hidden');
  setTimeout(() => {
    body.classList.remove('hidden');
  }, 1000 * seconds);
}

export function clearBoard(board, rows = 10, cols = 10) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const square = board.querySelector(
        `[data-row="${i}"] > [data-col="${j}"]`
      );
      square.style.backgroundColor = 'var(--square-background)';
    }
  }
}

export const print = (gameboard, boardElement, showShips, rows, cols) => {
  clearBoard(boardElement, rows, cols);
  for (let i = 0; i < gameboard.length; i++) {
    for (let j = 0; j < gameboard[i].length; j++) {
      const square = boardElement.querySelector(
        `[data-row="${i}"] > [data-col="${j}"]`
      );

      if (gameboard[i][j].ship && showShips && !gameboard[i][j].isHit) {
        square.style.backgroundColor = 'var(--green)';
      }

      if (gameboard[i][j].isHit) {
        square.style.backgroundImage = `url(${missImage})`;
      }

      if (gameboard[i][j].isHit && gameboard[i][j].ship) {
        square.style.backgroundImage = `url(${hitImage})`;
      }
    }
  }
};

export function makeSquaresClickable(board) {
  const squares = board.querySelectorAll('.square');

  squares.forEach((square) => {
    square.style.cursor = 'pointer';
  });
}

export function makeSquaresNotClickable(board) {
  const squares = board.querySelectorAll('.square');

  squares.forEach((square) => {
    square.style.cursor = 'default';
  });
}

export function deepCopyBoard(board) {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

export function previewShipPlacement(
  board,
  playerGameboard,
  row,
  col,
  length,
  horizontal,
  rows, 
  cols
) {
  //make an temp gameboard
  let copy = deepCopyBoard(playerGameboard.getBoard());

  const temp = gameboard(rows, cols, ship, copy);

  let err;
  try {
    temp.placeShip(row, col, length, horizontal);
    print(temp.getBoard(), board, true, cols, rows);
  } catch (e) {
    err = e;
  }

  if (err) {
    print(temp.getBoard(), board, true, rows, cols);

    const square = board.querySelector(
      `[data-row="${row}"] > [data-col="${col}"]`
    );

    square.style.backgroundColor = 'var(--red)';
  }
}