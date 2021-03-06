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

let team = [];

function Employee (name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
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
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: [
            'Engineer',
            'Intern',
            'Manager',
        ]
    },
    {
        type: "input",
        name: "github", 
        message: "What is your GitHub user ID?",
        when: (answer) => answer.role === 'Engineer'
    },
    {
        type: "input",
        name: "school", 
        message: "What is your school?",
        when: (answer) => answer.role === 'Intern'
    },
    {
        type: "number",
        name: "office", 
        message: "What is your office number?",
        when: (answer) => answer.role === 'Manager'
    },
];

employeeQuestions()

function employeeQuestions() {
    inquirer.prompt(questions).then((answers) => {
        let role = answers.role
        switch (role) {
            case 'Engineer':
            employee = new Engineer (answers.name, answers.id, answers.email, answers.github)
            team.push(employee);
            console.log(team);
            nextEmployee();
        break;

        case 'Intern':
            employee = new Intern (answers.name, answers.id, answers.email, answers.school)
            team.push(employee);
            console.log(team);
            nextEmployee();
        break;
        
        case 'Manager':
            employee = new Manager (answers.name, answers.id, answers.email, answers.office)
            team.push(employee);
            console.log(team);
            nextEmployee();
        break;
        
        default:
            employee = new Employee (answers.name, answers.id, answers.email);
        }
        });
}


function nextEmployee() {
    inquirer.prompt([
        {
            type: "list",
            name: "addEmployee",
            message: "Do you have another employee?",
            choices: [
                "yes",
                "no",
            ]
        }
    ])
    .then((answers) => {
        if (answers.addEmployee==="yes") {
            employeeQuestions()
        } else {
        renderHtml()
        }
    })
}

function renderHtml() {
    fs.writeFileSync(outputPath, render(team), "UTF-8")
};





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
