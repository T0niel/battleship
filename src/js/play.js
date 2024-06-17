import gameboard from './modules/gameboard'
import playerFactory from './modules/player'
import ship from './modules/ship'
import botFactory from './bot/modules/bot'

const playBot = async (render, input, playerShips, botShips, difficulty, rows = 10, cols = 10) => {
    const botGameboard = gameboard(rows, cols, ship);
    const playerGameboard = gameboard(rows, cols, ship);
    
    const player = playerFactory(botGameboard, playerGameboard);

    let maxShipLength = 0;
    playerShips.forEach(ship => {
        maxShipLength = ship.length;
        player.play(ship.row, ship.col, ship.length, ship.horizontal);
    })

    const bot = botFactory(difficulty, playerGameboard, botGameboard, maxShipLength);

    botShips.forEach(ship => {
        bot.play(ship.length);
    })

    while(true){
        const playerInput = await input.getAttack();
        if(!player.attack(playerInput.row, playerInput.col)) throw new Error('Cannot move there');

        if(botGameboard.isAllShipsSunked()){
            render(playerGameboard, botGameboard, true)
            break;
        }

        render(playerGameboard, botGameboard);

        bot.attack();

        if(playerGameboard.isAllShipsSunked()){
            render(playerGameboard, botGameboard, false, true)
            break;
        }

        render(playerGameboard, botGameboard);
    }
}

const playPlayer = async (render, playerOneInput, playerTwoInput, playerOneShips, playerTwoShips, rows = 10, cols = 10) => {
    const playerOneGameboard = gameboard(rows, cols, ship);
    const playerTwoGameboard = gameboard(rows, cols, ship);

    const playerOne = playerFactory(playerTwoGameboard, playerOneGameboard);

    playerOneShips.forEach((ship) => {
      playerOne.play(ship.row, ship.col, ship.length, ship.horizontal);
    });

    const playerTwo = playerFactory(playerOneGameboard, playerTwoGameboard);

    playerTwoShips.forEach((ship) => {
      playerTwo.play(ship.length);
    });

    while (true) {
        const playerOneIn = await playerOneInput.getAttack();
        
        if (!playerOne.attack(playerOneIn.row, playerOneIn.col))
            throw new Error('Cannot move there');

        //Player one won
        if(playerTwoGameboard.isAllShipsSunked()){
            render(playerOneGameboard, playerTwoGameboard, true);
            break;
        }
        
        render(playerOneGameboard, playerTwoGameboard);
        
        const playerTwoIn = await playerTwoInput.getAttack();

        if(!playerTwo.attack(playerTwoIn.row, playerTwoIn.col)){
            throw new Error('Cannot move there');
        }
        
        //Player two won
        if(playerOne.isAllShipsSunked()){
            render(playerOneGameboard, playerTwoGameboard, false, true);
            break;
        }
    }
}

export {
    playBot,
    playPlayer
}