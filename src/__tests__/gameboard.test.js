import gameboard from '../modules/gameboard';
import shipCreator from '../modules/ship';

describe('no edge cases', () => {
  it('Created the board', () => {
    const board = gameboard(10, 10, shipCreator);
    expect(board.getBoardColLength()).toEqual(10);
    expect(board.getBoardRowLength()).toEqual(10);
    expect(board.getBoard().length).toEqual(10);
    expect(board.getBoard()[0].length).toEqual(10);
  });

  it('Can place ship horizontally', () => {
    let row = 3;
    let col = 3;
    let horizontal = true;
    let length = 3;

    let expectedShip = shipCreator(length);
    let board = gameboard(10, 10, shipCreator);

    expect(board.placeShip(row, col, length, horizontal)).toBe(true);

    const placedShip1 = board.getBoard()[row][col];
    expect(placedShip1.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip1.isHit).toEqual(false);

    const placedShip2 = board.getBoard()[row][col - 1];
    expect(placedShip2.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip2.isHit).toEqual(false);

    const placedShip3 = board.getBoard()[row][col + 1];
    expect(placedShip3.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip3.isHit).toEqual(false);

    board = gameboard(10, 10, shipCreator);
    length = 4;
    expectedShip = shipCreator(length);

    expect(board.placeShip(row, col, length, horizontal)).toBe(true);

    const placedShip4 = board.getBoard()[row][col];
    expect(placedShip4.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip4.isHit).toEqual(false);

    const placedShip5 = board.getBoard()[row][col + 1];
    expect(placedShip5.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip5.isHit).toEqual(false);

    const placedShip6 = board.getBoard()[row][col + 2];
    expect(placedShip6.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip6.isHit).toEqual(false);

    const placedShip7 = board.getBoard()[row][col - 1];
    expect(placedShip7.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip7.isHit).toEqual(false);
  });

  it('Can place ship vertically', () => {
    let row = 3;
    let col = 3;
    let horizontal = false;
    let length = 3;

    let expectedShip = shipCreator(length);
    let board = gameboard(10, 10, shipCreator);

    expect(board.placeShip(row, col, length, horizontal)).toBe(true);

    const placedShip1 = board.getBoard()[row][col];
    expect(placedShip1.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip1.isHit).toEqual(false);

    const placedShip2 = board.getBoard()[row - 1][col];
    expect(placedShip2.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip2.isHit).toEqual(false);

    const placedShip3 = board.getBoard()[row + 1][col];
    expect(placedShip3.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip3.isHit).toEqual(false);

    length = 4;
    expectedShip = shipCreator(length);
    board = gameboard(10, 10, shipCreator);

    expect(board.placeShip(row, col, length, horizontal)).toBe(true);

    const placedShip4 = board.getBoard()[row][col];
    expect(placedShip4.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip4.isHit).toEqual(false);

    const placedShip5 = board.getBoard()[row + 1][col];
    expect(placedShip5.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip5.isHit).toEqual(false);

    const placedShip6 = board.getBoard()[row + 2][col];
    expect(placedShip6.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip6.isHit).toEqual(false);

    const placedShip7 = board.getBoard()[row - 1][col];
    expect(placedShip7.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(placedShip7.isHit).toEqual(false);
  });

  it('Can take attacks', () => {
    const row = 3;
    const col = 3;
    const horizontal = true;
    const length = 3;

    const expectedShip = shipCreator(length);
    expectedShip.hit();
    const board = gameboard(10, 10, shipCreator);

    board.placeShip(row, col, length, horizontal);
    expect(board.recieveAttack(row, col)).toEqual(true);

    const attackedCell = board.getBoard()[row][col];
    expect(attackedCell.ship.getHitAmounts()).toEqual(
      expectedShip.getHitAmounts()
    );
    expect(attackedCell.isHit).toEqual(true);
  });

  it('knows if all the ships got sunked', () => {
    const board = gameboard(10, 10, shipCreator);

    board.placeShip(3, 3, 3, true);
    board.placeShip(5, 5, 3, true);

    board.recieveAttack(3, 3);
    board.recieveAttack(3, 2);
    board.recieveAttack(3, 4);

    board.recieveAttack(5, 5);
    board.recieveAttack(5, 4);
    board.recieveAttack(5, 6);

    expect(board.isAllShipsSunked()).toBe(true);
  });

  it('knows if not all ships got sunked', () => {
    const board = gameboard(10, 10, shipCreator);

    board.placeShip(3, 3, 3, true);
    board.placeShip(5, 5, 3, true);

    board.recieveAttack(3, 3);
    board.recieveAttack(3, 2);
    board.recieveAttack(3, 4);

    expect(board.isAllShipsSunked()).toBe(false);
  });
});

describe('Edge cases', () => {
  it('expect exception, overlapping ships in row', () => {
    const board = gameboard(10, 10, shipCreator);
    const firstRow = 3;
    const firstCol = 3;
    const firstHorizontal = true;
    const firstLength = 3;

    board.placeShip(firstRow, firstCol, firstLength, firstHorizontal);
    board.recieveAttack(firstRow, firstCol);

    const secondRow = 3;
    const secondCol = 5;
    const secondHorizontal = true;
    const secondLength = 3;

    expect(() =>
      board.placeShip(secondRow, secondCol, secondLength, secondHorizontal)
    ).toThrow();
    board.recieveAttack(secondRow, secondCol);
  });

  it('expect exception, overlapping ships in col', () => {
    const board = gameboard(10, 10, shipCreator);
    const firstRow = 1;
    const firstCol = 1;
    const firstHorizontal = false;
    const firstLength = 3;

    board.placeShip(firstRow, firstCol, firstLength, firstHorizontal);
    board.recieveAttack(firstRow, firstCol);

    const secondRow = 3;
    const secondCol = 1;
    const secondHorizontal = false;
    const secondLength = 3;

    expect(() =>
      board.placeShip(secondRow, secondCol, secondLength, secondHorizontal)
    ).toThrow();
    board.recieveAttack(secondRow, secondCol);
  });

  it('expect to throw out of bounds in row', () => {
    const board = gameboard(10, 10, shipCreator);
    const firstRow = 10;
    const firstCol = 5;
    const firstHorizontal = false;
    const firstLength = 3;

    expect(() =>
      board.placeShip(firstRow, firstCol, firstLength, firstHorizontal)
    ).toThrow();

    const secondRow = -1;
    const secondCol = 5;
    const secondHorizontal = false;
    const secondLength = 3;

    expect(() =>
      board.placeShip(secondRow, secondCol, secondLength, secondHorizontal)
    ).toThrow();
  });

  it('expect to throw out of bounds in col', () => {
    const board = gameboard(10, 10, shipCreator);
    const firstRow = 5;
    const firstCol = 10;
    const firstHorizontal = false;
    const firstLength = 3;

    expect(() =>
      board.placeShip(firstRow, firstCol, firstLength, firstHorizontal)
    ).toThrow();

    const secondRow = 5;
    const secondCol = -3;
    const secondHorizontal = false;
    const secondLength = 3;

    expect(() =>
      board.placeShip(secondRow, secondCol, secondLength, secondHorizontal)
    ).toThrow();
  });

  it('expect to throw if could not fit', () => {
    const board = gameboard(10, 10, shipCreator);
    const firstRow = 1;
    const firstCol = 1;
    const firstHorizontal = false;
    const firstLength = 5;

    expect(() =>
      board.placeShip(firstRow, firstCol, firstLength, firstHorizontal)
    ).toThrow();

    const secondRow = 1;
    const secondCol = 1;
    const secondHorizontal = true;
    const secondLength = 4;

    expect(() =>
      board.placeShip(secondRow, secondCol, secondLength, secondHorizontal)
    ).toThrow();
  });
});
