function solution(N, stages) {
    var answer = [];
    let map = new Map();
    let cnt = 0;
    let allPlayer = stages.length;
    //스테이지 도달했지만 미클리어 / 스테이지에 도달한 플레이어

    for (let i = 1; i <= N; i++) {
        if (stages.forEach(ele => ele == N + 1)) {
            allPlayer = allPlayer - 1;
        }
        cnt = stages.filter(n => n == i).length;

        // console.log('stage = '+ i + '  player = '+ cnt +  '   fail= '+ cnt +'/'+allPlayer+ ' = ' + (cnt/allPlayer))
        map.set(i, cnt / allPlayer);
        allPlayer -= cnt;
    }

    let sortMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    sortMap.forEach((val, key) => answer.push(key))

    return answer;
  
}