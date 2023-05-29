// /* STUDENTS IGNORE THIS FUNCTION
//  * All this does is create an initial
//  * attendance record if one is not found
//  * within localStorage.
//  */
// (function() {
//     if (!localStorage.attendance) {
//         console.log('Creating attendance records...');
//         function getRandom() {
//             return (Math.random() >= 0.5);
//         }

//         var nameColumns = $('tbody .name-col'),
//             attendance = {};

//         nameColumns.each(function() {
//             var name = this.innerText;
//             attendance[name] = [];

//             for (var i = 0; i <= 11; i++) {
//                 attendance[name].push(getRandom());
//             }
//         });

//         localStorage.attendance = JSON.stringify(attendance);
//     }
// }());


// /* STUDENT APPLICATION */
// $(function() {
//     var attendance = JSON.parse(localStorage.attendance),
//         $allMissed = $('tbody .missed-col'),
//         $allCheckboxes = $('tbody input');

//     // Count a student's missed days
//     function countMissing() {
//         $allMissed.each(function() {
//             var studentRow = $(this).parent('tr'),
//                 dayChecks = $(studentRow).children('td').children('input'),
//                 numMissed = 0;

//             dayChecks.each(function() {
//                 if (!$(this).prop('checked')) {
//                     numMissed++;
//                 }
//             });

//             $(this).text(numMissed);
//         });
//     }

//     // Check boxes, based on attendace records
//     $.each(attendance, function(name, days) {
//         var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
//             dayChecks = $(studentRow).children('.attend-col').children('input');

//         dayChecks.each(function(i) {
//             $(this).prop('checked', days[i]);
//         });
//     });

//     // When a checkbox is clicked, update localStorage
//     $allCheckboxes.on('click', function() {
//         var studentRows = $('tbody .student'),
//             newAttendance = {};

//         studentRows.each(function() {
//             var name = $(this).children('.name-col').text(),
//                 $allCheckboxes = $(this).children('td').children('input');

//             newAttendance[name] = [];

//             $allCheckboxes.each(function() {
//                 newAttendance[name].push($(this).prop('checked'));
//             });
//         });

//         countMissing();
//         localStorage.attendance = JSON.stringify(newAttendance);
//     });

//     countMissing();
// }());

let model = {
    students: [
        {
            "id": 0,
            "name": "Slappy the Frog",
            "attended": [false, false, false, false, false, false, false, false, false, false, false, false],
            "daysMissed": 12
        },
        {
            "id": 1,
            "name": "Lilly the Lizard",
            "attended": [false, false, false, false, false, false, false, false, false, false, false, false],
            "daysMissed": 12
        },
        {
            "id": 2,
            "name": "Paulrus the Walrus",
            "attended": [false, false, false, false, false, false, false, false, false, false, false, false],
            "daysMissed": 12
        },
        {
            "id": 3,
            "name": "Gregory the Goat",
            "attended": [false, false, false, false, false, false, false, false, false, false, false, false],
            "daysMissed": 12
        },
        {
            "id": 4,
            "name": "Adam the Anaconda",
            "attended": [false, false, false, false, false, false, false, false, false, false, false, false],
            "daysMissed": 12
        }
    ]
}

let view = {
    init: function () {
        view.render();
    },
    clearAll: function () {
        $("#student-table-body").empty();
    },
    renderStudents: function () {

        this.clearAll();

        model.students.forEach(student => {
            let trStudent = $(`<tr class="student">`);
            let tdName = $(`<td class="name-col">${student.name}</td>`);
            let checkBoxes = view.renderCheckboxes(student.attended);
            let missedCol = $(`<td class="missed-col">${controller.getMissingDays(student.attended)}</td>`);


            //     let template = ` <tr class="student">
            //     <td class="name-col">${student.name}</td>
            //     ${view.renderCheckboxes(student.attended)}
            //     <td class="missed-col">${controller.getMissingDays(student.attended)}</td>
            //   </tr>`;

            trStudent.append(tdName);
            trStudent.append(checkBoxes);
            trStudent.append(missedCol);
            template = trStudent;

            $("#student-table-body").append(template);
            // $("#student-table-body").children().last().children()
            let checkbox = $("#student-table-body").children().last().find("input[type=checkbox]");
            for (let i = 0; i < checkbox.length; i++) {
                $(checkbox[i]).change(function () {
                    // console.log( $(checkbox[i]).prop('checked'));
                    controller.updateCheckbox(student.id, i, $(checkbox[i]).prop('checked'));
                    view.render();
                });

            }


        });
    },
    renderCheckboxes: function (studentAttendedArray) {
        let checkboxes = [];
        for (let i = 0; i < studentAttendedArray.length; i++) {
            let checkbox;
            if (studentAttendedArray[i] == true) {
                checkbox = (`<td class="attend-col"><input type="checkbox" checked /></td>`);
            }
            else {
                checkbox = (`<td class="attend-col"><input type="checkbox" /></td>`);
            }
            // $(checkbox).change(function () { 
            //         console.log(i);
            // });
            checkboxes.push($(checkbox));
        }
        return checkboxes;
    },
    render: function () {
        view.renderStudents();
    }
}

let controller = {
    init: function () {
        controller.fillLocalStorage();

        view.init();
    },
    fillLocalStorage: function () {
        if (!localStorage.attendance) {
            console.log('Creating attendance records...');

            function getRandom() {
                return (Math.random() >= 0.5);
            }

            for (let i = 0; i < model.students.length; i++) {
                for (let j = 0; j <= 11; j++) {
                    model.students[i].attended[j] = getRandom();
                }
            }
            localStorage.attendance = JSON.stringify(model);
        }
        else {
            model = JSON.parse(localStorage.attendance);
        }
    },
    getMissingDays: function (attendedArray) {
        count = 0;
        for (let i = 0; i < attendedArray.length; i++) {
            if (attendedArray[i] == false) {
                count++;
            }
        }
        return count;
    },
    updateCheckbox: function (studentId, i, checkbox) {
        // controller.updateCheckbox(student.id, $(checkbox[i]).prop('checked'));
        model.students[studentId].attended[i] = checkbox;
        localStorage.setItem("attendance", JSON.stringify(model));
        view.render();
    }
}

controller.init();