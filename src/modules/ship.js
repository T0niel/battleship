export default length => {
    let ammountsHit = 0;

    function hit(){
        if(ammountsHit + 1 <= length){
            ammountsHit++;
        }
    }

    function isSunk(){
        return ammountsHit === length;
    }

    return {
        hit,
        getHitAmounts(){
            return ammountsHit;
        },
        isSunk
    }
}