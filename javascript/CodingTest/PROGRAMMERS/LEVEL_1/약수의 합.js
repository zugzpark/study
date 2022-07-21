function solution(n) {
    
    // 삼항연산자
    
    answer = 0;

    for (let i = 0; i <= n; i++) {
        if (n % i == 0) {
            answer += i;
        }
    }

    //삼항연산자로 푼 해답 return n<=a/2?b:solution(n,a+1,b+=n%a?0:a); 
    return answer;
}