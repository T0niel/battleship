/* eslint-disable jest/expect-expect */
import playerFactory from '../player';
import gameboard from '../gameboard';
import ship from '../ship';

function testPlaceShipValid(row, col, length, horizontal, player) {
  expect(player.play(row, col, length, horizontal)).toBe(true);
}

function testPlaceShipInvalid(row, col, length, horizontal, player) {
  expect(player.play(row, col, length, horizontal)).toBe(false);
}

describe('no edge cases', () => {
  it('places ship to an valid place (horizontaly)', () => {
    const rows = 10;
    const cols = 10;

    const opponentGameboard = gameboard(rows, cols, ship);
    const playerGameboard = gameboard(rows, cols, ship);
    playerGameboard.placeShip = jest.fn((...args) => args);

    const player = playerFactory(opponentGameboard, playerGameboard);

    testPlaceShipValid(4, 4, 3, true, player);

    expect(playerGameboard.placeShip).toHaveBeenCalledWith(4, 4, 3, true);
  });

  it('places ship to an valid place (verticaly)', () => {
    const rows = 10;
    const cols = 10;

    const opponentGameboard = gameboard(rows, cols, ship);
    const playerGameboard = gameboard(rows, cols, ship);

    playerGameboard.placeShip = jest.fn((...args) => args);

    const player = playerFactory(opponentGameboard, playerGameboard);

    testPlaceShipValid(4, 4, 3, false, player);

    expect(playerGameboard.placeShip).toHaveBeenCalledWith(4, 4, 3, false);
  });

  it('attacks the enemy ship', () => {
    const rows = 10;
    const cols = 10;

    const opponentGameboard = gameboard(rows, cols, ship);
    const playerGameboard = gameboard(rows, cols, ship);
    opponentGameboard.placeShip(5, 5, 5, true);

    opponentGameboard.recieveAttack = jest.fn(() => true);

    const player = playerFactory(opponentGameboard, playerGameboard);
    expect(player.attack(5, 5)).toBe(true);
  });
});

describe('edge cases', () => {
  it('places ship to an invalid place (horizontaly), not enough space for ship placement', () => {
    const rows = 10;
    const cols = 10;

    const opponentGameboard = gameboard(rows, cols, ship);
    const playerGameboard = gameboard(rows, cols, ship);
    playerGameboard.placeShip = jest.fn(() => {
      throw new Error();
    });

    const player = playerFactory(opponentGameboard, playerGameboard);

    testPlaceShipInvalid(0, 0, 3, true, player);
  });

  it('places ship to an invalid place (horizontaly), out of bounds', () => {
    const rows = 10;
    const cols = 10;

    const opponentGameboard = gameboard(rows, cols, ship);
    const playerGameboard = gameboard(rows, cols, ship);
    playerGameboard.placeShip = jest.fn(() => {
      throw new Error();
    });

    const player = playerFactory(opponentGameboard, playerGameboard);

    testPlaceShipInvalid(-3, 5, 3, true, player);
    testPlaceShipInvalid(10, 5, 3, true, player);
    testPlaceShipInvalid(5, -3, 3, true, player);
    testPlaceShipInvalid(5, 10, 3, true, player);
  });

  it('places ship to an invalid place (verticaly), not enough space for ship placement', () => {
    const rows = 10;
    const cols = 10;

    const opponentGameboard = gameboard(rows, cols, ship);
    const playerGameboard = gameboard(rows, cols, ship);
    playerGameboard.placeShip = jest.fn(() => {
      throw new Error();
    });

    const player = playerFactory(opponentGameboard, playerGameboard);

    testPlaceShipInvalid(0, 0, 3, false, player);
  });

  it('places ship to an invalid place (varticaly), out of bounds', () => {
    const rows = 10;
    const cols = 10;

    const opponentGameboard = gameboard(rows, cols, ship);
    const playerGameboard = gameboard(rows, cols, ship);
    playerGameboard.placeShip = jest.fn(() => {
      throw new Error();
    });

    const player = playerFactory(opponentGameboard, playerGameboard);

    testPlaceShipInvalid(-3, 5, 3, false, player);
    testPlaceShipInvalid(10, 5, 3, false, player);
    testPlaceShipInvalid(5, -3, 3, false, player);
    testPlaceShipInvalid(5, 10, 3, false, player);
  });
});
