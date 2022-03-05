function solution(nums) {
    
    //중복제거 set
    var answer = 0;
    answer = new Set(nums);
    let choice = nums.length/2;     
    
   
    return answer.size > choice ? choice : answer.size;
}