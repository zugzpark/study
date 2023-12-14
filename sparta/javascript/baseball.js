const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let gameNum = 1;
let computerNum = randomNum();
let gameStart = true;


//게임 실행 함수
function baseBall() {

    let message = '컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!';

    //길이가 2이하거나 중복숫자일 경우
    if (!gameStart) {
        message = '서로 다른 숫자 3개를 입력해주세요!';

    }

    console.log(message);

    challenge();

}

//게임 시도 함수
function challenge() {
    rl.question(`${gameNum}번째 시도 : `, (answer) => {


        //중복, 길이가 3인지 여부 확인
        if ((new Set(answer)).size !== answer.length || answer.length !== 3) {

            gameStart = false;
            return baseBall();

        } else {

            //입력과 랜덤숫자가 같을때
            if (answer == computerNum) {

                console.log(`3S\n${gameNum}번만에 맞히셨습니다.\n게임을 종료합니다.`);


            } else {
                //볼과 스트라이크 판별
                let ball = 0;
                let strike = 0;

                for (let i = 0; i < computerNum.length; i++) {

                    if (computerNum[i] == answer[i]) {

                        strike++;

                    } else if (computerNum.includes(answer[i])) {

                        ball++;
                    }
                }

                ball == 3 ? console.log(`${ball}B`) : console.log(`${ball}B ${strike}S`);

                gameNum++

                return challenge();
            }
        }
        rl.close();
    });
}


//랜덤 숫자 생성
function randomNum() {
    let result = '';

    while (result.length != 3) {

        let num = Math.floor(Math.random() * 10);

        if (!result.includes(num)) {
            result += num;
        }


    }
    return result;
}

//게임 실행
baseBall()
