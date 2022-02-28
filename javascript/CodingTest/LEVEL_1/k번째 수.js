function solution(array, commands) {
    
    
    // *** 디스트럭처링 할당
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    
    // sort((a,b) => a-b) 를 해주지 않으면 유니코드 정렬이라 80이 9 보다 앞에 올 수 있음.
    // compareFunction을 제공하지 않으면 요소를 문자열로 변환하고 유니코드 코드포인트 순서로 문자열을 비교하여 정렬됨

    var answer = [];
    let count=0;
    let startIndex=0;
    let endIndex=0;
    let commandsNum=0;
    
    commands.forEach(val => val.forEach(ele => 
                                        {
                                        count++;
                                        switch(count){

                                            case 1:
                                                startIndex=ele;
                                                break;
                                            case 2:
                                                endIndex=ele;
                                                break;
                                            case 3:
                                                commandsNum=ele;

                                                answer.push(array.slice(startIndex-1,endIndex).
                                                sort((a,b)=>a-b)[commandsNum-1])    
                                                count=0;
                                                break;
                                        }

                                        })
                    )
    return answer;
}