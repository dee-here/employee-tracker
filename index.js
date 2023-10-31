const inquirer = require('inquirer');

const db = require('./db/query');


const promptQuestions = [
    {
        message: 'Checking Prompts',
        name: 'testPrompt',
        default: 'HELLO PROMPT !!',
    }
];

const roleQuestion = [
    {
        message: 'Role title ?',
        name: 'roleTitle'
    },
    {
        message: 'Role salary ?',
        name: 'roleSalary'
    },
    {
        type: 'list',
        message: 'Select Role department?',
        name: 'roleTitle'
    }
];

const departmentNameQuestion = [
    {
        message: 'Department name ?',
        name: 'departmentName'
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
  console.clear();
  console.log("\n");
  console.log("\n");
  console.log("View All Employee!");
  db.viewAllEmployees()
    .then(([data]) => {
      console.log("\n");
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
  console.clear();
  console.log("viewAllRoles!");
  db.viewAllRoles()
    .then(([data]) => {
      console.table("\n");
      console.table(data);
    })
    .catch((err) => console.log("Error: ", err));

  showMainMenu();
}

function getDepartmentChoiceList() {
  // const [rows] =
  db.viewAllDepartments()
    .then(([data]) => {
      console.log("\n");
      console.log("getDepartmentChoiceList ",data);
      const departmentChoices = data.map((item) => ({
        name: item.name,
        value: item.id,
      }));
      console.log("getDepartmentChoiceList returns ",departmentChoices);

      const roleQuestions = [
        {
            name: 'roleTitle',
            message: 'Enter Role Title',
        },
        {
            name: 'roleSalary',
            message: 'Enter Role Salary',
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'Select Role Department',
            choices: departmentChoices
        }
      ];

      inquirer.prompt(roleQuestions)
        .then(answer => {
            console.log("Answers are: ", answer);
            //execute query to add ROLE 
            db.addRole(answer.roleTitle, parseInt(answer.roleSalary, 10), answer.roleDepartment)
            .then(([data]) => {
                console.log('\n');
                console.log(`Role successfully created.`);})
            .catch((err) => console.log("Error: ", err));

        })
        .catch();

      //return departmentChoices;

    })
    .catch((err) => console.log("Error: ", err));
}

function addRole() {
    console.clear();
    console.log('addRole!');
    getDepartmentChoiceList();


    //createa  function to query and get all departments 
    // showMainMenu();
}

function viewAllDepartments() {
    console.clear();
    db.viewAllDepartments()
      .then(([data]) => {
        console.log("\n");
        console.table(data);
      })
      .catch((err) => console.log("Error: ", err));

    showMainMenu();
}


function addDepartment() {
    console.clear();
    console.log('addDepartment!');
    //show prompt to get departname and pass it to query
    inquirer
      .prompt(departmentNameQuestion)
      .then((answer) => {
        console.log("departmentNameQuestion ", answer.departmentName);
        if (!!answer.departmentName) {
          db.addDepartment(answer.departmentName)
            .then(([data]) => {
              console.log("\n", answer.departmentName);
              console.log(`Department: ${answer.departmentName} successfully added.`);
              showMainMenu();
              //console.table(data);
            })
            .catch((err) => console.log("Error: ", err));
        }
      })
      .catch();



    
}

function stopApplication() {
    console.log('stopApplication');
    process.kill(0);
}

//starting menu
function showMainMenu() {
    console.clear();
    console.log('\n');
    process.stdout.write('\u001B[2J\u001B[0;0H');
    inquirer.prompt(mainMenuQuestions)
        .then(answer => {
            console.log('mainMenuQuestions Answers : ', answer, answer.mainMenuChoice);
            // const selection = answer.mainMenuChoice;
            switch (answer.mainMenuChoice) {
              case "View All Employees":
                process.stdout.write('\u001B[2J\u001B[0;0H');
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
    console.log('\n');
    process.stdout.write('\u001B[2J\u001B[0;0H');
    showMainMenu();
         
}


//start execution
init();


