function solution(a, b) {
    //* reduce() 로 간단히 표현 ,0 << index의 시작점 설정
    return a.reduce((acc, val, i) => acc += val * b[i], 0)

}