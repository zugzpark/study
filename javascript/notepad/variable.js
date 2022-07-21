'use strict';

// let (added in ES6)


//hoisting ? : 선언 위치에 상관없이 제일 위로 선언을 끌어올리는것 var 같은것 < **let으로 써야함!!! {} 도 무시함
//constant ? : 값을 선언하면 변경 불가 (immutable) 장점 - 보안성, 효율성, 휴먼에러방지 read only
//let (Mutable)

//Variable types
//primitive, single item : number , string , boolean , null , undefiend , symbol
//object , box contaner
//function , first-class function



//boolean
// false : 0 , null , undefined , NaN , ''
// true : any other value

//symbol
// 고유한 식별자를 정의할때 사용
// 동일한 symbol을 만들고싶다면 symbol.for 사용
// 출력시 symbol.description 으로 toString 하여 출력

// TS 가 나온이유 : JS 가 Dynamic typing 이기 때문 - type이 유연하게 정의되기 때문 