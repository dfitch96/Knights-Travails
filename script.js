
const moves = [
    
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1]
    
];


function knightMoves(start, end){

    const queue = [start];
    const visited = [];
    const paths = new Map();
    paths.set(JSON.stringify(start), null);

    while (queue.length > 0){
        
        const cur = queue.shift();
        visited.push(cur);

        if((cur[0] === end[0]) && (cur[1] === end[1])){
            return paths;
        }

        for(const move of moves){
            const yPos = cur[0] + move[0];
            const xPos = cur[1] + move[1];

            if(yPos < 0 || yPos > 7 || xPos < 0 || xPos > 7){
                continue;
            }

            if(!visited.some(([vy, vx]) => vy === yPos && vx === xPos)){
                queue.push([yPos, xPos]);
                paths.set(JSON.stringify([yPos, xPos]), JSON.stringify(cur));
            }
        }

    }

    return paths;

}


function backtrace(paths, start, end){

    let child = JSON.stringify(end);
    let parent = paths.get(child);
    const result = [];
    while(parent !== null){
        result.push(child);
        child = parent;
        parent = paths.get(child);
    }


    result.push(JSON.stringify(start));
    result.reverse();
    return result;



}

const start = [0, 0];
const end = [7, 7];
const paths = knightMoves(start, end);

console.log(`Path from ${start} to ${end}: ${backtrace(paths, start, end)}`);




