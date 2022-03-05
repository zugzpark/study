function solution(new_id) {
    //정규표현식
    // ^ : 문장의 시작
    // & : 문장의 끝
    // \w : 단어
    // .{2,} : .이 최소 2개 이상
    // g 전역검색
    // chartAt 문자열에서 지정된 위치 존재하는 문자를 찾아 반환
    // repaeat 문자열을 주어진 횟수만큼 반복해 붙인 새로운 문자열 반환
    // padEnd(targetLength [, padString]) -> answer.padEnd(3,answer[answer.length-1])
    // tasrgetLength : 목표문자열길이 padString 현재 문자열에 채워넣을 다른문자열
    var answer ="";

    answer = new_id.toLowerCase()
        .replace(/[^\w-_.]/g,'')
        .replace(/\.{2,}/g,'.')
        .replace(/^\.|\.$/g,'')
        .replace(/^$/,'a')
        .slice(0,15).replace(/\.$/,'');
    let idLength= answer.length
    
    
    return idLength>2 ? answer : answer+answer.charAt(idLength-1).repeat(3-idLength);
}