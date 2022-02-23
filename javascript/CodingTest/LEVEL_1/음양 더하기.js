function solution(absolutes, signs) {
    
    // *reduce() 숙지

    var answer = 0;

    for (let i = 0; i < signs.length; i++) {
        if (signs[i]) {
            answer += absolutes[i]
        } else {
            answer -= absolutes[i]
        }
    }
    //return absolutes.reduce((acc, val, i) => acc + (val * (signs[i] ? 1 : -1)), 0);
     
    
    return answer;
}