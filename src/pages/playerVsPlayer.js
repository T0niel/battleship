import board from '../components/board';
import gameboard from '../js/modules/gameboard';
import player from '../js/modules/player';
import ship from '../js/modules/ship';
import battleshipImage from '../imgs/ships/battleship.png';
import cruiserImage from '../imgs//ships/cruiser.png';
import destroyerImage from '../imgs/ships/destroyer.png';
import submarineImage from '../imgs/ships/submarine.png';
import carrierImage from '../imgs/ships/carrier.png';
import _ from 'lodash';

const body = document.querySelector('body');

const play = (rows, cols) => {
  let currentShipElement = null;
  let currentPlayer = `player one`;
  let horizontal = true;
  const playerOneGameboard = gameboard(rows, cols, ship);
  const playerTwoGameboard = gameboard(rows, cols, ship);
  const playerOne = player(playerTwoGameboard, playerOneGameboard);
  const playerTwo = player(playerOneGameboard, playerTwoGameboard);

  function clearBoard(board){
    for(let i = 0; i < rows; i++){
     for (let j = 0; j < cols; j++) {
      const square = board.querySelector(
        `[data-row="${i}"] > [data-col="${j}"]`
      );
      square.style.backgroundColor = 'var(--text)';
     } 
    }
  }

  const print = (gameboard, boardElement, showShips) => {
    clearBoard(boardElement);
    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard[i].length; j++) {
        const square = boardElement.querySelector(
          `[data-row="${i}"] > [data-col="${j}"]`
        );

        if (gameboard[i][j].ship && showShips) {
          square.style.backgroundColor = 'var(--green)';
        }

        if (gameboard[i][j].isHit) {
          square.style.backgroundColor = 'var(--red)';
        }

        if (gameboard[i][j].ship && gameboard[i][j].isHit) {
          square.style.backgroundColor = 'var(--yellow)';
        }
      }
    }
  };

  function deepCopyBoard(board){
    return board.map((row) => row.map((cell) => ({ ...cell })));
  };

  function previewShipPlacement(board, row, col, length, horizontal) {
    console.log({ row, col, length });
    //make an temp gameboard
    let copy = deepCopyBoard(playerOneGameboard.getBoard());
    if(currentPlayer === 'player two'){
      copy = deepCopyBoard(playerTwoGameboard.getBoard());
    }

    const temp = gameboard(rows, cols, ship, copy);

    let err;
    try {
      temp.placeShip(row, col, length, horizontal);
      console.log('placed');
      print(temp.getBoard(), board, true);
    } catch (e) {
      console.log(e.message);
      err = e;
    }

    if (err) {
      clearBoard(board);
      const square = board.querySelector(
        `[data-row="${row}"] > [data-col="${col}"]`
      );

      square.style.backgroundColor = 'red';
    }
  }



  function shipContainer() {
    const shipContainerElement = document.createElement('div');
    shipContainerElement.classList.add('ship-container');

    return shipContainerElement;
  }

  function addShipToShipContainer(length, shipimage, name) {
    const shipContainer = document.querySelector('.ship-container');

    const ship = document.createElement('div');
    ship.classList.add('ship');
    ship.classList.add(name);
    ship.id = length;

    ship.style.width = `${length * 4}rem`;
    ship.style.backgroundSize = `${length * 3}rem`;
    ship.style.backgroundImage = `url(${shipimage})`;

    shipContainer.appendChild(ship);
  }

  function makeSquaresClickable(board) {
    const squares = board.querySelectorAll('.square');

    squares.forEach((square) => {
      square.style.cursor = 'pointer';
    });
  }

  function listenForSquareHover(board) {
    const squares = board.querySelectorAll('.square');

    squares.forEach((square) => {
      square.addEventListener('mouseover', () => {
        if (!currentShipElement) return;

        const row = square.parentElement.getAttribute('data-row');
        const col = square.getAttribute('data-col');
        const length = currentShipElement.id;

        previewShipPlacement(board, +row, +col, +length, horizontal);
      });
    });
  }

    function squareClickShipHandeler(board) {
      const squares = board.querySelectorAll('.square');

      squares.forEach((square) =>
        square.addEventListener('click', () => {
          if (!currentShipElement) return;

          console.log({ currentShipElement });

          const row = square.parentElement.getAttribute('data-row');
          const col = square.getAttribute('data-col');
          const length = currentShipElement.id;

          if (currentPlayer === 'player one') {
            playerOne.play(row, col, length, horizontal);
            print(playerOneGameboard, board, true);
          } else {
            playerTwo.play(row, col, length, horizontal);
            print(playerTwoGameboard, board, true);
          }
        })
      );
    }

  function watchForShipChanges(board) {
    const ships = document.querySelectorAll('.ship');

    ships.forEach((ship) => {
      ship.addEventListener('click', () => {
        if (currentShipElement) {
          currentShipElement.style.display = 'block';
        }
        currentShipElement = ship;
        currentShipElement.style.display = 'none';
        makeSquaresClickable(board);
      });
    });

    listenForSquareHover(board);
    squareClickShipHandeler(board);
  }

  const init = () => {
    const shipContainerElement = shipContainer();

    const message = document.createElement('div');
    message.textContent = 'Boilerplate message';
    message.classList.add('message');
    body.appendChild(message);

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');

    const firstPlayerBoard = board(rows, cols, 'Player one');
    const secondPlayerBoard = board(rows, cols, 'Player two');

    boardContainer.appendChild(firstPlayerBoard);
    boardContainer.appendChild(secondPlayerBoard);

    body.appendChild(boardContainer);
    body.appendChild(shipContainerElement);

    addShipToShipContainer(3, submarineImage, 'submarine');
    addShipToShipContainer(2, destroyerImage, 'destroyer');
    addShipToShipContainer(5, carrierImage, 'carrier');
    addShipToShipContainer(4, battleshipImage, 'battleship');
    addShipToShipContainer(3, cruiserImage, 'cruiser');
    watchForShipChanges(firstPlayerBoard);
  };

  init();
};

export default play;
