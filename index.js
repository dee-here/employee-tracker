const inquirer = require('inquirer');

const db = require('./db/query');
const {
    addEmployeeQuestions,
    mainMenuQuestions,
    departmentNameQuestion,
    roleQuestions,
    updateEmployeeRoleQuestions,
} = require("./questions");

async function viewAllEmployees() {
    var [data] = await db.viewAllEmployees()
    console.log("\n");
    console.table(data);
    showMainMenu();  
  }

async function addEmployee() {
    const [roleData] = await db.viewAllRoles()
    const roleChoices = roleData.map((item) => ({
      name: item.title,
      value: item.id,
    }));

    const [managerData] = await db.getAllEmployeesAsSelectOptions();

    managerData.push({name: "None", value: null});
    const answers = await inquirer.prompt(addEmployeeQuestions(roleChoices,managerData));
    try {
        const result = await db.addEmployee(answers.firstName, answers.lastName, answers.role, answers.manager);
        console.log(`Employee ${answers.firstName} ${answers.lastName} added.`);
    } catch (error) {
        console.error("Error ", error.message);
    }
    showMainMenu();
}

async function updateEmployeeRole () {
    const [allEmployeesChoice] = await db.getAllEmployeesAsSelectOptions();
    const [allRoles] = await db.getAllRolesAsSelectOptions();

    const answers = await inquirer.prompt(updateEmployeeRoleQuestions(allEmployeesChoice, allRoles));
    try {
        const result = await db.updateEmployeeRole(answers.employeeChoice, answers.roleChoice);
        console.log(" Employee Role Updated.");
    } catch (error) {
        console.error("Error ", error.message);
    }
    showMainMenu();
}

function viewAllRoles() {
  db.viewAllRoles()
    .then(([data]) => {
      console.table("\n");
      console.table(data);
      showMainMenu();
    })
    .catch((err) => console.log("Error: ", err));

}


function addRole() {
    db.viewAllDepartments()
    .then(([data]) => {
      const departmentChoices = data.map((item) => ({
        name: item.name,
        value: item.id,
      }));

      inquirer.prompt(roleQuestions(departmentChoices))
        .then(answer => {
            //execute query to add ROLE 
            db.addRole(answer.roleTitle, parseInt(answer.roleSalary, 10), answer.roleDepartment)
            .then(([data]) => {
                console.log('\n');
                console.log(`Role successfully created.`);
                showMainMenu();
            })
            .catch((err) => console.log("Error: ", err));
        })
    })
    .catch((err) => console.log("Error: ", err));
}

function viewAllDepartments() {
    db.viewAllDepartments()
      .then(([data]) => {
        console.log("\n");
        console.table(data);
        showMainMenu();
      })
      .catch((err) => console.log("Error: ", err));
      
}


function addDepartment() {
  inquirer
    .prompt(departmentNameQuestion())
    .then((answer) => {
      if (!!answer.departmentName) {
        db.addDepartment(answer.departmentName)
          .then(([data]) => {
            console.log(
              `Department: ${answer.departmentName} successfully added.`
            );
            showMainMenu();
          })
          .catch((err) => console.log("Error: ", err));
      }
    })
    .catch((err) => console.log("Error: ", err));
}

function stopApplication() {
    console.log('Stopping Application');
    process.kill(0);
}

//starting menu
function showMainMenu() {
    console.log('\n');
    console.log('What would you like to do :');

    inquirer.prompt(mainMenuQuestions())
        .then(answer => {
            switch (answer.mainMenuChoice) {
              case "View All Employees":
                console.log("View All Employees : ");
                console.log('\n');
                viewAllEmployees();
                break;
              case "Add Employee":
                console.log("Add Employee : ");
                console.log('\n');
                addEmployee();
                break;
              case "Update Employee Role":
                console.log("Update Employee Role : ");
                console.log('\n');
                updateEmployeeRole();
                break;
              case "View All Roles":
                console.log("View All Roles : ");
                console.log('\n');
                viewAllRoles();
                break;
              case "Add Role":
                console.log("Add Role : ");
                console.log('\n');
                addRole();
                break;
              case "View All Departments":
                console.log("View All Departments : ");
                console.log('\n');
                viewAllDepartments();
                break;
              case "Add Department":
                console.log("Add Department : ");
                console.log('\n');
                addDepartment();
                break;
              case "Quit":
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
    showMainMenu();
         
}


//start execution
init();


