const createBoard = (rows, cols) => {
  const board = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push({
        ship: null,
        isHit: false,
      });
    }
    board.push(row);
  }

  return board;
};

export default (rows, cols, shipCreator, board) => {
  if(!board){
    board = createBoard(rows, cols);
  }

  function placeShip(row, col, length, horizontal) {
    validateShipPlacement(row, col);
    if (horizontal) {
      return placeShipHorizontal(row, col, length);
    }

    return placeShipVertical(row, col, length);
  }

  function getBoard() {
    return board;
  }

  function validateShipPlacement(row, col) {
    if (row >= rows || row < 0 || col >= cols || col < 0) {
      throw new Error('Out of bounds');
    }
  }

  function placeShipHorizontal(row, col, length) {
    const sideLength = getSideLength(length);
    let left = sideLength;
    let right = sideLength;
    const ship = shipCreator(length);

    if (length % 2 === 0) {
      left--;
    }

    const placeLeft = () => {
      for (let i = 0; i <= left; i++) {
        if (col - i < 0) {
          throw new Error('Could not fit');
        }

        if (board[row][col - i].ship) {
          throw new Error('Ship already exists on this square');
        }

        board[row][col - i].ship = ship;
      }
    };

    const placeRight = () => {
      for (let i = 0; i <= right; i++) {
        if (row + i > cols) {
          throw new Error('Could not fit');
        }

        if (board[row][col + i].ship && i !== 0) {
          throw new Error('Ship already exists on this square');
        }

        board[row][col + i].ship = ship;
      }
    };

    placeLeft();
    placeRight();

    return true;
  }

  function placeShipVertical(row, col, length) {
    const sideLength = getSideLength(length);
    let top = sideLength;
    let bottom = sideLength;
    const ship = shipCreator(length);

    if (length % 2 === 0) {
      top--;
    }

    const placeTop = () => {
      for (let i = 0; i <= top; i++) {
        if (row - i < 0) {
          throw new Error('Could not fit');
        }

        if (board[row - i][col].ship) {
          throw new Error('Ship already exists on this square');
        }

        board[row - i][col].ship = ship;
      }
    };

    const placeBottom = () => {
      for (let i = 0; i <= bottom; i++) {
        if (row + i > rows) {
          throw new Error('Could not fit');
        }

        if (board[row + i][col].ship && i !== 0) {
          throw new Error('Ship already exists on this square');
        }

        board[row + i][col].ship = ship;
      }
    };

    placeTop();
    placeBottom();

    return true;
  }

  function recieveAttack(row, col) {
    const square = board[row][col];
    square.isHit = true;

    if (square.ship) {
      square.ship.hit();
      return true;
    }

    return false;
  }

  function getSideLength(length) {
    return Math.floor(length / 2);
  }

  function getBoardColLength() {
    return cols;
  }

  function getBoardRowLength() {
    return rows;
  }

  function isAllShipsSunked(){
    let sunked = true;
    board.forEach(row => {
      row.forEach(col => {
        if(col.ship && !col.ship.isSunk()){
          sunked = false;
        }
      })
    })

    return sunked;
  }

  return {
    placeShip,
    getBoard,
    recieveAttack,
    isAllShipsSunked,
    getBoardColLength,
    getBoardRowLength,
  };
};
