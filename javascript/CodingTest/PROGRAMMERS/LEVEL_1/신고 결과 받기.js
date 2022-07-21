function solution(id_list, report, k) {

    let reportObj = new Map();

    //* Array destructuring 테크니션 연습
    id_list.forEach(val => {
        (reportObj[val] = {
            report: [],
            reported: 0,
            isStoppedId: false,
        });
    });

    report.forEach(val => {
        let [reportPerson, reportedPerson] = val.split(' ');

        if (reportObj[reportPerson].report.indexOf(reportedPerson) === -1) {
            reportObj[reportPerson].report.push(reportedPerson);
            reportObj[reportedPerson].reported += 1;

            if (reportObj[reportedPerson].reported >= k) {
                reportObj[reportedPerson].isStoppedId = true;
            }
        }
    });

    let answer = id_list.map(val => {
        return reportObj[val].report.filter((reportId) => reportObj[reportId].isStoppedId).length;
    });


    
    return answer;
}