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

export default (rows, cols, shipCreator) => {
  const board = createBoard(rows, cols);

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
    const placeLeft = () => {
      for (let i = 0; i <= sideLength; i++) {
        if (col - i < 0) {
          throw new Error('Could not fit');
        }

        if (board[row][col - i].ship) {
          throw new Error('Ship already exists on this square');
        }

        board[row][col - i].ship = shipCreator(length);
      }
    };

    const placeRight = () => {
      for (let i = 0; i <= sideLength; i++) {
        if (row + i > cols) {
          throw new Error('Could not fit');
        }

        if (board[row][col + i].ship && i !== 0) {
          throw new Error('Ship already exists on this square');
        }

        board[row][col + i].ship = shipCreator(length);
      }
    };

    placeLeft();
    placeRight();

    return true;
  }

  function placeShipVertical(row, col, length) {
    const sideLength = getSideLength(length);
    const placeTop = () => {
      for (let i = 0; i <= sideLength; i++) {
        if (row + i > rows) {
          throw new Error('Could not fit');
        }

        if (board[row + i][col].ship) {
          throw new Error('Ship already exists on this square');
        }

        board[row + i][col].ship = shipCreator(length);
      }
    };

    const placeBottom = () => {
      for (let i = 0; i <= sideLength; i++) {
        if (row - i < 0) {
          throw new Error('Could not fit');
        }

        if (board[row - i][col].ship && i !== 0) {
          throw new Error('Ship already exists on this square');
        }

        board[row - i][col].ship = shipCreator(length);
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
    if (length % 2 === 1) {
      return Math.floor(length / 2);
    }

    return Math.floor(length / 2) - 1;
  }

  function getBoardColLength(){
    return cols;
  }

  function getBoardRowLength(){
    return rows;
  }

  return {
    placeShip,
    getBoard,
    recieveAttack,
    getBoardColLength,
    getBoardRowLength
  };
};
