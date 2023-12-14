const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let gameNum = 1;
let computerNum = randomNum();
let gameStart = true;


function baseBall() {

    let message = '컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!';

    if (!gameStart) {
        message = '서로 다른 숫자 3개를 입력해주세요!';
        gameNum--;
    }

    console.log(message);

    challenge();

}

function challenge() {
    rl.question(`${gameNum}번째 시도 : `, (answer) => {
        let [num1, num2, num3] = answer.split('');
        
        if (answer.length !== 3 ||
            isNaN(Number(answer)) ||
            num1 == num2 ||
            num2 == num3 ||
            num3 == num1) {

            gameNum++
            gameStart = false;
            return baseBall();

        } else {

            if (answer == computerNum) {

                console.log(`3S\n${gameNum}번만에 맞히셨습니다.\n게임을 종료합니다.`);

            } else {

                let ball = 0;
                let strike = 0;

                for (let i = 0; i < computerNum.length; i++) {

                    if (computerNum[i] == answer[i]) {

                        strike++;

                    } else {

                        if (computerNum.includes(answer[i])) ball++;
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



function randomNum() {
    let result = '';
    let num = Math.floor(Math.random() * 10);

    while (result.length != 3) {

        while (result.includes(num)) {
            num = Math.floor(Math.random() * 10);
        }
        result += num;

    }
    return result;
}


baseBall()
