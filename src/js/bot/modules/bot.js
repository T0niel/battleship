import heatMap from './heatMap';
import randomizeHeatMap from './randomizeHeatMap';

export default (
  difficulty,
  playerGameboard,
  botGameboard,
  maxShipLength = 5
) => {
  function play(shipLength) {
    const horizontal = Math.floor(Math.random() * 2) === 0;
    const horizontalPlaces = horizontalShipPlaces(shipLength);
    const verticalPlaces = verticalShipPlaces(shipLength);

    if (horizontal && horizontalPlaces.length) {
      const rn = Math.floor(Math.random() * (horizontalPlaces.length - 1));
      const place = horizontalPlaces[rn];

      botGameboard.placeShip(place.row, place.col, shipLength, horizontal);

      return true;
    } else if (!horizontal && verticalPlaces.length) {
      const rn = Math.floor(Math.random() * (horizontalPlaces.length - 1));
      const place = verticalPlaces[rn];

      botGameboard.placeShip(place.row, place.col, shipLength, horizontal);

      return true;
    }

    return false;
  }

  function horizontalShipPlaces(length) {
    function shipPlacesRow(total, start, end, length, row, rowIdx, prev) {
      let count = 0;
      for (let i = start; i <= end; i++) {
        if (!row[i].ship && !prev.includes(i)) {
          count++;
        }

        if (row[i].ship) {
          count = 0;
        }

        if (count === length) {
          prev.push(i);
          total.push({
            row: rowIdx,
            col: i - length + Math.round(length / 2),
          });
          count = 0;
        }
      }
    }

    const cols = botGameboard.getBoardColLength();
    const rows = botGameboard.getBoardRowLength();

    const total = [];
    for (let i = 0; i < rows; i++) {
      const prev = [];
      for (let j = 0; j < cols; j++) {
        if (j + length < cols)
          shipPlacesRow(
            total,
            j,
            j + length,
            length,
            botGameboard.getBoard()[i],
            i,
            prev
          );
      }
    }

    return total;
  }

  function verticalShipPlaces(length) {
    function shipPlacesColumn(total, start, end, length, grid, colIdx) {
      for (let i = start; i <= end - length + 1; i++) {
        let valid = true;
        for (let j = 0; j < length; j++) {
          if (grid[i + j][colIdx].ship) {
            valid = false;
            break;
          }
        }
        if (valid) {
          total.push({
            row: i + Math.floor(length / 2),
            col: colIdx,
          });
        }
      }
    }

    const board = botGameboard.getBoard();
    let total = [];
    for (let colIdx = 0; colIdx < board.length; colIdx++) {
      shipPlacesColumn(total, 0, board.length - 1, length, board, colIdx);
    }
    return total;
  }

  //Flips the difficulty to control that we pass to the randomized function (1 -> 0) and (0 -> 1)
  function flip(n) {
    return 1 - n;
  }

  function attack() {
    const map = heatMap(
      playerGameboard.getBoard(),
      playerGameboard.getBoardColLength(),
      playerGameboard.getBoardRowLength(),
      maxShipLength
    );
    if (boardIsEmpty(map)) {
      return makeRandomAttack();
    }
    const randomized = randomizeHeatMap(map, flip(difficulty));
    const bestAttack = pickMostPropableAttack(randomized);

    if (!bestAttack) return false;

    return playerGameboard.recieveAttack(bestAttack.row, bestAttack.col);
  }

  function getValidAttacks() {
    return playerGameboard
      .getBoard()
      .map((row, rowIdx) =>
        row
          .map((col, squareIdx) => ({
            square: col,
            row: rowIdx,
            col: squareIdx,
          }))
          .filter((col) => !col.square.isHit)
      )
      .filter((row) => row.length > 0);
  }

  function makeRandomAttack() {
    const validAttacks = getValidAttacks();

    if (validAttacks.every((row) => !row.length)) return false;

    const rnRow = Math.floor(Math.random() * validAttacks.length - 1);
    const rnCol = Math.floor(Math.random() * validAttacks[rnRow].length - 1);

    const randomSquare = validAttacks[rnRow][rnCol];

    return playerGameboard.recieveAttack(randomSquare.col, randomSquare.row);
  }

  function boardIsEmpty(board) {
    return board.every((row) => row.every((col) => col === 0));
  }

  function canAttack() {
    const map = heatMap(
      playerGameboard.getBoard(),
      playerGameboard.getBoardColLength(),
      playerGameboard.getBoardRowLength(),
      maxShipLength
    );
    return map.some((row) => row.some((col) => col !== null));
  }

  function pickMostPropableAttack(heatMap) {
    let best = null;
    let biggest = -Infinity;
    heatMap.forEach((row, rowIdx) =>
      row.forEach((col, colIdx) => {
        if (col > biggest) {
          biggest = col;
          best = { row: rowIdx, col: colIdx };
        }
      })
    );

    return best;
  }

  return {
    canAttack,
    attack,
    play,
    getBoard: () => botGameboard,
    getOpponentBoard: () => playerGameboard
  };
};
