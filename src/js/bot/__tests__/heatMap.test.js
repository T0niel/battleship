import ship from '../../modules/ship';
import heatMap from '../modules/heatMap';

const emptySquare = () => {
  return {
    isHit: false,
    ship: null,
  };
};

const occupiedSquare = (len) => {
  return {
    isHit: true,
    ship: ship(len),
  };
};

describe('No edge cases', () => {
  it('Empty board', () => {
    const board = [
      [emptySquare(), emptySquare(), emptySquare(), emptySquare()],
      [emptySquare(), emptySquare(), emptySquare(), emptySquare()],
      [emptySquare(), emptySquare(), emptySquare(), emptySquare()],
      [emptySquare(), emptySquare(), emptySquare(), emptySquare()],
    ];

    const map = heatMap(board, board.length, board[0].length);

    expect(map).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  it('One ship board', () => {
    const board = [
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        occupiedSquare(2),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
    ];

    const map = heatMap(board, board.length, board[0].length);

    expect(map).toEqual([
      [0, 0, 1.5, 0, 0],
      [0.5, 1.5, null, 1.5, 0.5],
      [0, 0, 1.5, 0, 0],
      [0, 0, 0.5, 0, 0],
      [0, 0, 0.5, 0, 0],
    ]);
  });

  it('Two ship board (vertical)', () => {
    const board = [
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        occupiedSquare(2),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        occupiedSquare(2),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
    ];

    const map = heatMap(board, board.length, board[0].length);

    expect(map).toEqual([
      [0, 0, 2, 0, 0],
      [0, 0, null, 0, 0],
      [0, 0, null, 0, 0],
      [0, 0, 2, 0, 0],
      [0, 0, 1, 0, 0],
    ]);
  });

  it('Two ship board (horizontal)', () => {
    const board = [
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        occupiedSquare(2),
        occupiedSquare(2),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
    ];

    const map = heatMap(board, board.length, board[0].length);

    expect(map).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 2, null, null, 2],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});

describe('Edge cases', () => {
  it('ship placed near border', () => {
    let board = [
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        occupiedSquare(2),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
    ];

    let map = heatMap(board, board.length, board[0].length);

    expect(map).toEqual([
      [0.5, 0, 0, 0, 0],
      [1.5, 0, 0, 0, 0],
      [null, 1.5, 0.5, 0.5, 0.5],
      [1.5, 0, 0, 0, 0],
      [0.5, 0, 0, 0, 0],
    ]);

    board = [
      [
        emptySquare(),
        emptySquare(),
        occupiedSquare(2),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
    ];

    map = heatMap(board, board.length, board[0].length);

    expect(map).toEqual([
      [0.5, 1.5, null, 1.5, 0.5],
      [0, 0, 1.5, 0, 0],
      [0, 0, 0.5, 0, 0],
      [0, 0, 0.5, 0, 0],
      [0, 0, 0.5, 0, 0],
    ]);
  });

  it('Ships in different places', () => {
    let board = [
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        occupiedSquare(2),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        occupiedSquare(2),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
      [
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
        emptySquare(),
      ],
    ];

    let map = heatMap(board, board.length, board[0].length);
    expect(map).toEqual([
      [1, 0.5, 1.5, null, 1.5],
      [1.5, 0, 0, 1.5, 0],
      [null, 1.5, 0.5, 1, 0.5],
      [1.5, 0, 0, 0.5, 0],
      [0.5, 0, 0, 0.5, 0],
    ]);
  });
});
