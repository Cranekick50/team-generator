const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let team = []

function Employee (name, id, email, role) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }

let questions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's ID?",
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email?",
    },
    {
        type: "checkbox",
        name: "role",
        message: "What is the employee's role?",
        choices: [
            "Engineer",
            "Intern",
            "Manager",
        ]
    },
];

employeeQuestions()

function employeeQuestions() {
    inquirer.prompt(questions).then ((answers) => {
        let employee = new Employee (answers.name, answers.id, answers.email, answers.role)
        role = answers.role[0];
        team.push(employee);
        console.log(team);
        extraQuestion();
    });
}



var role

const extraQuestion = () => {
    console.log(role)
    switch (role) {
        case "Engineer":
            inquirer.prompt([
                {
                    type: "input",
                    name: "github", 
                    message: "What is your GitHub user ID?",

                },
                
            ])
            .then((answers) => {
                nextEmployee()
                console.log(answers)
            })
        break;

        case "Intern":
            
            inquirer.prompt([
                {
                    type: "input",
                    name: "school", 
                    message: "What school do you go to?",

                },
            ])
            .then((answers) => {
                nextEmployee()
                console.log(answers)
            })
        break;

        case "Manager":
            
            inquirer.prompt([
                {
                    type: "input",
                    name: "office", 
                    message: "What is your office number?",

                },
            ])
            .then((answers) => {
                nextEmployee()
                console.log(answers)
            })
        break;

        default:
            console.log("no role selected.")
    }
}


function nextEmployee() {
    inquirer.prompt([
        {
            type: "checkbox",
            name: "addEmployee",
            message: "Do you have another employee?",
            choices: [
                "yes",
                "no",
            ]
        }
    ])
    .then((answers) => {
        console.log(answers.addEmployee[0])
        if (answers.addEmployee[0]==="yes") {
            employeeQuestions()
        }
    })
}






// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
