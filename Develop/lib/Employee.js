// TODO: Write code to define and export the Employee class
export class Employee {
    constructor(name, id, email, role) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }
}


function employeeDetails(answers){
    let teamMember = new Employee
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

inquirer.prompt(questions, employeeDetails);

