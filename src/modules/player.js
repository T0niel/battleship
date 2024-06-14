export default (opponentGameboard, playerGameboard) => {

    function play(row, col, length, horizontal){
        let err = null;
        try{
            playerGameboard.placeShip(row, col, length, horizontal);
        }catch(e){
            console.log(e.message);
            err = e;
        }

        if(err){
            return false;
        }

        return true;
    }

    return {
        play
    }
}