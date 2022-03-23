function solution(record) {

    let user = {};
    let answer = [];
    let states = [];
    let massage = {
        "Enter" : "님이 들어왔습니다.",
        "Leave" : "님이 나갔습니다.",
    }

    for(rec of record){
        const [state , userId , name] = rec.split(" ");
        //console.log(state + " / "+ userId +"  / " + name)

        switch(state){
            case "Enter" : 
                user[userId] = name;
                states.push([state, userId])
                break;

            case "Leave" :
                states.push([state,userId])
                break;

            case "Change" :
                user[userId] = name;

        }        
    }
    for(ans of states){

     answer.push(`${user[ans[1]]}${massage[ans[0]]}`)
    }

    return answer    
}