'use strict';

//1. make a String out of an array --> String 으로 리턴
{
    const fruits = ['apple','banana','orange'];
    const result = fruits.join(' and ');
    //console.log(result);
}


//2. make an array out of a string --> string을 array로 리턴
{
    const fruits = 'apple, banana, orange';
    const result = fruits.split(',');
    //console.log(result);
}

//3. make this array look like this : [5,4,3,2,1] --> reverse
{
    const array= [1,2,3,4,5];
    //const result = array.reverse();
    //console.log(result);
}

//4. make new array without the first two elements --> slice
{
    const array= [1,2,3,4,5];
    const result = array.slice(2);
    //console.log(result);
    //console.log(array);
}


class Student{
    constructor(name, age, enrolled, score){
        this.name = name;
        this.age = age;
        this.enrolled = enrolled
        this.score = score;
    }
}

const students = [
    new Student('A',29,true,45),
    new Student('B',28,false,80),
    new Student('C',30,true,90),
    new Student('D',40,false,66),
    new Student('E',18,true,88),
];

//5. find a student with score 90 
{
    const result = students.find((student) => student.score === 90).split;
    //console.log(result);    
}

//6. make an array of enrolled students
{
    const result = students.filter((student) => student.enrolled);

    console.log(result);
}

//7. make an array containing only the students' scores result should be : [45,80,90,66,88];
{
    const result = students.map((student) => student.score);
    console.log(result);
}

//8. check if there is a student with the score lower than 50
{
    const result = students.some((student) => student.score < 50 );
    console.log(result);
}

//9. compute students' avrage score
{
    const result = students.reduce((prev , curr) => {
    console.log(prev);
    console.log(curr);
    
    });
    
    
    
}