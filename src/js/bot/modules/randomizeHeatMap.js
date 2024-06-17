export default (heatmap, control) => {
    function randomzieRow(array){
        return array.map(n => {
            if(n === null) return null;
            if(n === 0 ) n = 0.5;

            const randomizeFactor = 1 + (Math.random() * 2 - 1) * control;
            return n * randomizeFactor;
        })
    }

    function randomizeHeatMap(){
        return heatmap.map(row => randomzieRow(row));
    }

    return randomizeHeatMap();
}