function solution(left, right) {
    var answer = 0;
    let count = 0;

    //제곱근을 활용해볼것

    for(var i=left ; i<=right ; i++){
        for(var j=1 ; j<=i ; j++){
            if(i%j==0){
                count++
            } 
            if(i==j){
                if(count%2==0){
                    answer+=i    
                }else{
                    answer-=i;
                }
                count = 0 ;
            }
        }
    }
    return answer;

    //제곱근이 정수면 약수의 갯수가 홀수를 활용
    // if (Number.isInteger(Math.sqrt(i))) << 명답
 
}