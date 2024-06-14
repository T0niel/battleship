import playerFactory from '../modules/player';
import gameboard from '../modules/gameboard';
import ship from '../modules/ship';

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
    playerGameboard.placeShip = jest.fn((...args) =>
      args
    );

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
});
