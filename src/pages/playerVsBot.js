import board from '../components/board';
import gameboard from '../js/modules/gameboard';
import playerCreator from '../js/modules/player';
import ship from '../js/modules/ship';
import battleshipImage from '../imgs/ships/battleship.png';
import cruiserImage from '../imgs//ships/cruiser.png';
import destroyerImage from '../imgs/ships/destroyer.png';
import submarineImage from '../imgs/ships/submarine.png';
import carrierImage from '../imgs/ships/carrier.png';
import endGame from '../components/endGame';
import {
  print,
  makeSquaresClickable,
  makeSquaresNotClickable,
  previewShipPlacement,
} from './domUtils/boardUtils';
import { addShip, placeShips, shipContainer } from './domUtils/shipUtils';
import botCreator from '../js/bot/modules/bot';

const body = document.querySelector('body');
let currentShipElement;

const play = (rows, cols, randomizeFactor = 0.7) => {
  const maxShipLength = 5;
  let ships = [];
  const playerGameboard = gameboard(rows, cols, ship);
  const botGameboard = gameboard(rows, cols, ship);
  const bot = botCreator(
    randomizeFactor,
    playerGameboard,
    botGameboard,
    maxShipLength
  );
  const player = playerCreator(botGameboard, playerGameboard);
  let horizontal = true;
  let currentPlayer = 'player one';

  let currentEventListener;
  function handleShipRotation(board, square) {
    function keydownListener(e) {
      if (e.key.toLowerCase() === 'r') {
        horizontal = !horizontal;
      }
      const mouseOverEvent = new MouseEvent('mouseover');
      square.dispatchEvent(mouseOverEvent);
    }

    if (currentEventListener) {
      document.documentElement.removeEventListener(
        'keydown',
        currentEventListener
      );
    }

    currentEventListener = keydownListener;
    document.documentElement.addEventListener('keydown', currentEventListener);
  }

  function listenForSquareHover(board) {
    const squares = board.querySelectorAll('.square');

    squares.forEach((square) => {
      square.addEventListener('mouseover', () => {
        if (!currentShipElement) return;

        const row = +square.parentElement.getAttribute('data-row');
        const col = +square.getAttribute('data-col');
        const length = +currentShipElement.id;

        handleShipRotation(board, square);

        previewShipPlacement(
          board,
          playerGameboard,
          row,
          col,
          length,
          horizontal,
          rows,
          cols
        );
      });
    });
  }

  function squareClickShipHandeler(board, botBoard) {
    const squares = board.querySelectorAll('.square');

    squares.forEach((square) =>
      square.addEventListener('click', () => {
        if (!currentShipElement) return;

        const row = +square.parentElement.getAttribute('data-row');
        const col = +square.getAttribute('data-col');
        const length = +currentShipElement.id;
        const name = currentShipElement.classList[1];

        const success = player.play(row, col, length, horizontal);
        print(playerGameboard.getBoard(), board, true, cols, rows);
        if (!success) {
          square.style.backgroundColor = 'var(--red)';
        } else {
          ships = ships.filter(
            (ship) => ship.name !== name || ship.length !== length
          );

          currentShipElement = null;
          makeSquaresNotClickable(board);
        }

        if (ships.length === 0) {
          currentPlayer = 'bot';
          botShips(botBoard, board);
        }
      })
    );
  }

  function initalizeShips() {
    addShip(3, submarineImage, 'submarine', ships);
    addShip(2, destroyerImage, 'destroyer', ships);
    addShip(5, carrierImage, 'carrier', ships);
    addShip(4, battleshipImage, 'battleship', ships);
    addShip(3, cruiserImage, 'cruiser', ships);
  }

  function handleAttackOpponent(player, playerBoard, botBoard) {
    const opponentSquares = botBoard.querySelectorAll('.square');

    opponentSquares.forEach((square) => {
      makeSquaresClickable(botBoard);
      square.addEventListener('click', () => {
        const row = square.parentElement.getAttribute('data-row');
        const col = square.getAttribute('data-col');

        if (currentPlayer !== 'player') {
          return;
        }

        //If the square that we are trying to attack was attacked prior ignore
        if (botGameboard.getBoard()[row][col].isHit) {
          return;
        }

        player.attack(row, col);

        if (botGameboard.isAllShipsSunked()) {
          endGame(`${currentPlayer} Won!`, play, [10, 10, randomizeFactor]);
          return;
        }

        print(botGameboard.getBoard(), botBoard, false, rows, cols);

        makeSquaresNotClickable(botBoard);

        currentPlayer = 'bot';
        bot.attack();
        print(playerGameboard.getBoard(), playerBoard, true, rows, cols);

        if (playerGameboard.isAllShipsSunked()) {
          endGame(`${currentPlayer} Won!`, play, [10, 10, randomizeFactor]);
          return;
        }

        makeSquaresClickable(botBoard);

        currentPlayer = 'player';
      });
    });
  }

  function botShips(botBoard, playerBoard) {
    initalizeShips();

    ships.forEach((ship) => {
      ({ ship });
      bot.play(ship.length);
    });

    ships = [];

    print(botGameboard.getBoard(), botBoard, false, rows, cols);

    currentPlayer = 'player';
    const message = document.querySelector('.message-content');
    message.textContent = 'player, waiting for your attack';
    makeSquaresClickable(botBoard);
    handleAttackOpponent(player, playerBoard, botBoard);
  }

  function watchForShipChanges(board, botBoard) {
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
    squareClickShipHandeler(board, botBoard);
  }

  function playerStart(playerBoard, botBoard) {
    initalizeShips();

    placeShips(ships);
    watchForShipChanges(playerBoard, botBoard);
  }

  const init = () => {
    const shipContainerElement = shipContainer();

    const passBtnContainer = document.createElement('div');
    passBtnContainer.classList.add('pass-btn-container');

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message');

    const messageContent = document.createElement('div');
    messageContent.textContent = 'player one place your ships (R to rotate)';
    messageContent.classList.add('message-content');

    const rotateIcon = document.createElement('div');
    rotateIcon.classList.add('rotate-icon');

    rotateIcon.onclick = () => (horizontal = !horizontal);

    messageContainer.appendChild(messageContent);
    messageContainer.appendChild(rotateIcon);

    body.appendChild(messageContainer);

    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');

    const playerBoard = board(rows, cols, 'player');
    const botBoard = board(rows, cols, 'bot');

    boardContainer.appendChild(playerBoard);
    boardContainer.appendChild(botBoard);

    body.appendChild(boardContainer);
    body.appendChild(shipContainerElement);

    body.appendChild(passBtnContainer);

    playerStart(playerBoard, botBoard);
  };

  init();
};

export default play;
