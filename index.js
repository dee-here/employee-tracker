const inquirer = require('inquirer');

const db = require('./db/query');


const promptQuestions = [
    {
        message: 'Checking Prompts',
        name: 'testPrompt',
        default: 'HELLO PROMPT !!',
    }
];

const mainMenuQuestions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'mainMenuChoice',
        choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit'
        ]
    }
];

//create a function to handle each switch case
function viewAllEmployees() {
  console.log("View All Employee!");
  db.viewAllEmployees()
    .then(([data]) => {
      console.table("\n");
      console.table(data);
    })
    .catch((err) => console.log("Error: ", err));

  showMainMenu();
}

function addEmployee() {
    console.log('addEmployee!');

    showMainMenu();
}

function updateEmployeeRole() {
    console.log('updateEmployeeRole!');

    showMainMenu();
}

function viewAllRoles() {
  console.log("viewAllRoles!");
  db.viewAllRoles()
    .then(([data]) => {
      console.table("\n");
      console.table(data);
    })
    .catch((err) => console.log("Error: ", err));

  showMainMenu();
}

function addRole() {
    console.log('addRole!');
    showMainMenu();
}

function viewAllDepartments() {
  
  db.viewAllDepartments()
    .then(([data]) => {
        console.table('\n');
        console.table(data);})
    .catch((err) => console.log("Error: ", err));

  showMainMenu();
}


function addDepartment() {
    console.log('addDepartment!');

    showMainMenu();
}

function stopApplication() {
    console.log('stopApplication');
    process.kill(0);
}

//starting menu
function showMainMenu() {
    inquirer.prompt(mainMenuQuestions)
        .then(answer => {
            console.log('mainMenuQuestions Answers : ', answer, answer.mainMenuChoice);
            // const selection = answer.mainMenuChoice;
            switch (answer.mainMenuChoice) {
              case "View All Employees":
                console.log("USer slected : ", answer);
                console.log('\n');
                viewAllEmployees();
                break;
              case "Add Employee":
                console.log("User slected : ", answer);
                console.log('\n');
                addEmployee();
                break;
              case "Update Employee Role":
                console.log("USer slected : ", answer);
                console.log('\n');
                updateEmployeeRole();
                break;
              case "View All Roles":
                console.log("USer slected : ", answer);
                console.log('\n');
                viewAllRoles();
                break;
              case "Add Role":
                console.log("USer slected : ", answer);
                console.log('\n');
                addRole();
                break;
              case "View All Departments":
                console.log("USer slected : ", answer);
                console.log('\n');
                viewAllDepartments();
                break;
              case "Add Department":
                console.log("USer slected : ", answer);
                console.log('\n');
                addDepartment();
                break;
              case "Quit":
                console.log("USer slected : ", answer);
                console.log('\n');
                stopApplication();
                break;
              default:
                console.log("No selection !");
            }
        })
        .catch(error => console.log('Error is: ', error));

}

function init() {
    showMainMenu();
         
}


//start execution
init();


