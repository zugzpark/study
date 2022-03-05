function solution(board, moves) {
    var answer = 0;
    let boom = new Array;
    let TFswitch = true;
    //boom.pop(board.length-1)
    //boom.forEach(n => console.log(n))
    //board[1][0]
    //board[2][0]
    moves.forEach(n => {
        console.log(n)
        TFswitch = true;

        for (let i = 0; i < board.length; i++) {
            if (TFswitch) {
                //console.log(board[i])

                for (let j = 0; j < board[i].length; j++) {
                    //console.log(board[i][j])
                    if (board[i][n - 1] != 0) {
                        if (boom[boom.length - 1] == board[i][n - 1]) {
                            boom.pop();
                            answer += 2;
                        } else {
                            boom.push(board[i][n - 1]);
                        }
                        //boom.forEach(n => console.log(" " + n + " <> " + boom[boom.length-1]))
                        board[i][n - 1] = 0;
                        TFswitch = false;
                        break;

                        //i=board.length;
                        //nsole.log(board[i][n-1])

                    }
                }
            }
        }
    })
    // 0 0 0 0 0 [0][a]
    // 0 0 1 0 3 [1][a]
    // 0 2 5 0 1 [2][a]
    // 4 2 4 4 2 [3][a]
    // 3 5 1 3 1 [4][a]

    // 0 1 2 3 4 
    // 1 5 3 5 1 2 1 4 

    // 4 3 1 1 3 2 0 4
    //console.log(" == > " + answer)
    return answer;
}

   /* reduce 등 다른사람풀이

const transpose = matrix =>
    matrix.reduce(
        (result, row) => row.map((_, i) => [...(result[i] || []), row[i]]),
        []
    );

const solution = (board, moves) => {
    const stacks = transpose(board).map(row =>
        row.reverse().filter(el => el !== 0)
    );
    const basket = [];
    let result = 0;

    for (const move of moves) {
        const pop = stacks[move - 1].pop();
        if (!pop) continue;
        if (pop === basket[basket.length - 1]) {
            basket.pop();
            result += 2;
            continue;
        }
        basket.push(pop);
    }

    return result;
};
*/