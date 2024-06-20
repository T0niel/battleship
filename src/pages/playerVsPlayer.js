import board from '../components/board';
import gameboard from '../js/modules/gameboard';
import player from '../js/modules/player';
import ship from '../js/modules/ship';
import battleshipImage from '../imgs/ships/battleship.png';
import cruiserImage from '../imgs//ships/cruiser.png';
import destroyerImage from '../imgs/ships/destroyer.png';
import submarineImage from '../imgs/ships/submarine.png';
import carrierImage from '../imgs/ships/carrier.png';
import hitImage from '../imgs/hit.png';
import missImage from '../imgs/miss.png';
import endGame from '../components/endGame';

const body = document.querySelector('body');

const play = (rows, cols, screenTimeoutSeconds = 2) => {
  let currentShipElement = null;
  let currentPlayer = 'player one';
  let horizontal = true;
  let ships = [];
  const playerOneGameboard = gameboard(rows, cols, ship);
  const playerTwoGameboard = gameboard(rows, cols, ship);
  const playerOne = player(playerTwoGameboard, playerOneGameboard);
  const playerTwo = player(playerOneGameboard, playerTwoGameboard);

  function screenTimeout(seconds) {
    body.classList.add('hidden');
    setTimeout(() => {
      body.classList.remove('hidden');
    }, 1000 * seconds);
  }

  function clearBoard(board) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const square = board.querySelector(
          `[data-row="${i}"] > [data-col="${j}"]`
        );
        square.style.backgroundColor = 'var(--square-background)';
      }
    }
  }

  const print = (gameboard, boardElement, showShips) => {
    console.log({ gameboard, boardElement, showShips });
    clearBoard(boardElement);
    for (let i = 0; i < gameboard.length; i++) {
      for (let j = 0; j < gameboard[i].length; j++) {
        const square = boardElement.querySelector(
          `[data-row="${i}"] > [data-col="${j}"]`
        );

        if (gameboard[i][j].ship && showShips && !gameboard[i][j].isHit) {
          square.style.backgroundColor = 'var(--green)';
        }

        if (gameboard[i][j].isHit) {
          square.style.backgroundImage = `url(${missImage})`;
        }

        if (gameboard[i][j].isHit && gameboard[i][j].ship) {
          square.style.backgroundImage = `url(${hitImage})`;
        }
      }
    }
  };

  function deepCopyBoard(board) {
    return board.map((row) => row.map((cell) => ({ ...cell })));
  }

  function previewShipPlacement(board, row, col, length, horizontal) {
    //make an temp gameboard
    let copy = deepCopyBoard(playerOneGameboard.getBoard());
    if (currentPlayer === 'player two') {
      copy = deepCopyBoard(playerTwoGameboard.getBoard());
    }

    const temp = gameboard(rows, cols, ship, copy);

    let err;
    try {
      temp.placeShip(row, col, length, horizontal);
      print(temp.getBoard(), board, true);
    } catch (e) {
      err = e;
    }

    if (err) {
      print(temp.getBoard(), board, true);

      const square = board.querySelector(
        `[data-row="${row}"] > [data-col="${col}"]`
      );

      square.style.backgroundColor = 'var(--red)';
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

        handleShipRotation(board, square);
        previewShipPlacement(board, +row, +col, +length, horizontal);
      });
    });
  }

  function squareClickShipHandeler(board) {
    const squares = board.querySelectorAll('.square');

    squares.forEach((square) =>
      square.addEventListener('click', () => {
        if (!currentShipElement) return;

        const row = +square.parentElement.getAttribute('data-row');
        const col = +square.getAttribute('data-col');
        const length = +currentShipElement.id;
        const name = currentShipElement.classList[1];

        if (currentPlayer === 'player one') {
          const success = playerOne.play(row, col, length, horizontal);
          print(playerOneGameboard.getBoard(), board, true);
          if (!success) {
            square.style.backgroundColor = 'var(--red)';
          } else {
            ships = ships.filter(
              (ship) => ship.name !== name || ship.length !== length
            );

            currentShipElement = null;
            makeSquaresNotClickable(board);
          }
        } else {
          const success = playerTwo.play(row, col, length, horizontal);
          print(playerTwoGameboard.getBoard(), board, true);
          if (!success) {
            square.style.backgroundColor = 'var(--red)';
          } else {
            ships = ships.filter(
              (ship) => ship.name !== name || ship.length !== length
            );

            currentShipElement = null;
            makeSquaresNotClickable(board);
          }
        }

        const passBtn = document.querySelector('.pass-btn');
        if (ships.length === 0) {
          passBtn.style.display = 'block';
        } else {
          passBtn.style.display = 'none';
        }
      })
    );
  }

  let currentEventListener;

  function handleShipRotation(board, square) {
    function keydownListener(e) {
      if (e.key.toLowerCase() === 'r') {
        horizontal = !horizontal;
      }
      const mouseOverEvent = new MouseEvent('mouseover');
      square.dispatchEvent(mouseOverEvent);
    }

    // If there is an existing event listener, remove it
    if (currentEventListener) {
      document.documentElement.removeEventListener(
        'keydown',
        currentEventListener
      );
    }

    // Add the new event listener
    currentEventListener = keydownListener;
    document.documentElement.addEventListener('keydown', currentEventListener);
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

  function makeSquaresNotClickable(board) {
    const squares = board.querySelectorAll('.square');

    squares.forEach((square) => {
      square.style.cursor = 'default';
    });
  }

  function allShipsPlaced() {
    return ships.length === 0;
  }

  function handleAttackOpponent(
    player,
    opponent,
    opponentBoard,
    playerBoard,
    opponentGameboard
  ) {
    const opponentSquares = opponentBoard.querySelectorAll('.square');
    let attackHandeled = false;

    opponentSquares.forEach((square) => {
      makeSquaresClickable(opponentBoard);
      square.addEventListener('click', () => {
        const row = square.parentElement.getAttribute('data-row');
        const col = square.getAttribute('data-col');
        const passBtn = document.querySelector('.pass-btn');

        if (attackHandeled) {
          return;
        }

        //If the square that we are trying to attack was attacked prior ignore
        if (opponentGameboard.getBoard()[row][col].isHit) {
          passBtn.style.display = 'none';
          return;
        }

        player.attack(row, col);

        if (opponentGameboard.isAllShipsSunked()) {
          endGame(`${currentPlayer} Won!`, play, [10, 10, screenTimeoutSeconds]);
          return;
        }

        passBtn.style.display = 'block';

        print(opponentGameboard.getBoard(), opponentBoard, false);

        attackHandeled = true;
        makeSquaresNotClickable(opponentBoard);

        handlePlayerPass(opponent, player, opponentBoard, playerBoard);
      });
    });
  }

  let firstTime = true;
  function handlePlayerPass(player, opponent, playerBoard, opponentBoard) {
    const passBtn = document.querySelector('.pass-btn');

    passBtn.addEventListener('click', function handeler() {
      const messageElement = document.querySelector('.message-content');

      if (firstTime && allShipsPlaced()) {
        console.log('in ships');
        currentPlayer =
          currentPlayer === 'player one' ? 'player two' : 'player one';
        playerStart(opponentBoard, playerBoard);
        opponentBoard.style.display = 'block';
        firstTime = false;

        passBtn.style.display = 'none';
        messageElement.textContent = `${currentPlayer} place your ships (R to rotate)`;
        screenTimeout(screenTimeoutSeconds);
      } else if (allShipsPlaced()) {
        console.log('in attack');

        currentPlayer =
          currentPlayer === 'player one' ? 'player two' : 'player one';
        playerBoard.style.display = 'block';
        opponentBoard.style.display = 'block';

        messageElement.textContent = `${currentPlayer}, waiting for your attack`;
        console.log('Printing', {
          playerGameboard: player.getBoard(),
          playerBoard,
          ships: true,
        });
        print(player.getBoard().getBoard(), playerBoard, true);
        print(player.getOpponentBoard().getBoard(), opponentBoard, false);
        handleAttackOpponent(
          player,
          opponent,
          opponentBoard,
          playerBoard,
          player.getOpponentBoard()
        );

        passBtn.removeEventListener('click', handeler);
        screenTimeout(screenTimeoutSeconds);
      }
    });
  }

  function placeShips() {
    ships.forEach((ship) => {
      addShipToShipContainer(ship.length, ship.img, ship.name);
    });
  }

  function addShip(length, img, name) {
    ships.push({ length, img, name });
  }

  function playerStart(playerBoard, opponentBoard) {
    addShip(3, submarineImage, 'submarine');
    addShip(2, destroyerImage, 'destroyer');
    addShip(5, carrierImage, 'carrier');
    addShip(4, battleshipImage, 'battleship');
    addShip(3, cruiserImage, 'cruiser');

    placeShips();
    watchForShipChanges(playerBoard);

    opponentBoard.style.display = 'none';
  }

  const init = () => {
    const shipContainerElement = shipContainer();

    const passBtnContainer = document.createElement('div');
    passBtnContainer.classList.add('pass-btn-container');

    const passBtn = document.createElement('button');
    passBtn.classList.add('pass-btn');
    passBtn.textContent = 'Pass player';

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

    const firstPlayerBoard = board(rows, cols, 'Player one');
    const secondPlayerBoard = board(rows, cols, 'Player two');

    boardContainer.appendChild(firstPlayerBoard);
    boardContainer.appendChild(secondPlayerBoard);

    body.appendChild(boardContainer);
    body.appendChild(shipContainerElement);

    passBtnContainer.appendChild(passBtn);
    body.appendChild(passBtnContainer);

    playerStart(firstPlayerBoard, secondPlayerBoard);
    handlePlayerPass(playerOne, playerTwo, firstPlayerBoard, secondPlayerBoard);
  };

  init();
};

export default play;
