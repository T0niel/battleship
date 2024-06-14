import gameboard from '../modules/gameboard';
import shipCreator from '../modules/ship';

describe('no edge cases', () => {
  it('Created the board', () => {
    const board = gameboard(10, 10, shipCreator);
    expect(board.getBoardColLength()).toEqual(10);
    expect(board.getBoardRowLength()).toEqual(10);
    expect(board.getBoard().length).toEqual(10);
    expect(board.getBoard()[0].length).toEqual(10);
  })
  
  it('Can place ship horizontal', () => {
    const row = 3;
    const col = 3;
    const horizontal = true;
    const length = 3;

    const expectedShip = shipCreator(length);
    const board = gameboard(10, 10, shipCreator);

    expect(board.placeShip(row, col, length, horizontal)).toBe(true);
    expect(JSON.stringify(board.getBoard()[row][col])).toEqual(JSON.stringify({
      ship: expectedShip,
      isHit: false,
    }));
    expect(JSON.stringify(board.getBoard()[row][col - 1])).toEqual(
      JSON.stringify({
        ship: expectedShip,
        isHit: false,
      })
    );

    expect(JSON.stringify(board.getBoard()[row][col + 1])).toEqual(
      JSON.stringify({
        ship: expectedShip,
        isHit: false,
      })
    );
  });

  it('Can place ship verticaly', () => {
    const row = 3;
    const col = 3;
    const horizontal = false;
    const length = 3;

    const expectedShip = shipCreator(length);
    const board = gameboard(10, 10, shipCreator);

    expect(board.placeShip(row, col, length, horizontal)).toBe(true);
    expect(JSON.stringify(board.getBoard()[row][col])).toEqual(
      JSON.stringify({
        ship: expectedShip,
        isHit: false,
      })
    );
    expect(JSON.stringify(board.getBoard()[row - 1][col])).toEqual(
      JSON.stringify({
        ship: expectedShip,
        isHit: false,
      })
    );

    expect(JSON.stringify(board.getBoard()[row + 1][col])).toEqual(
      JSON.stringify({
        ship: expectedShip,
        isHit: false,
      })
    );
  });

  it('Can take attacks', () => {
    const row = 3;
    const col = 3;
    const horizontal = true;
    const length = 3;

    const expectedShip = shipCreator(length);
    const board = gameboard(10, 10, shipCreator);

    board.placeShip(row, col, length, horizontal);
    expect(board.recieveAttack(row, col)).toEqual(true);
    expect(JSON.stringify(board.getBoard()[row][col])).toEqual(JSON.stringify({
      ship: expectedShip,
      isHit: true,
    }));
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

    expect(() => board.placeShip(secondRow, secondCol, secondLength, secondHorizontal)).toThrow();
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

    expect(() => board.placeShip(secondRow, secondCol, secondLength, secondHorizontal)).toThrow();
    board.recieveAttack(secondRow, secondCol);
  });

  it('expect to throw out of bounds in row', () => {
    const board = gameboard(10, 10, shipCreator);
    const firstRow = 10;
    const firstCol = 5;
    const firstHorizontal = false;
    const firstLength = 3;

    expect(() => board.placeShip(firstRow, firstCol, firstLength, firstHorizontal)).toThrow();
    
    const secondRow = -1;
    const secondCol = 5;
    const secondHorizontal = false;
    const secondLength = 3;

    expect(() => board.placeShip(secondRow, secondCol, secondLength, secondHorizontal)).toThrow();
  })

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
    })
});
