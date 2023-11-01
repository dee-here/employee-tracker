const inquirer = require('inquirer');

const db = require('./db/query');
const {addEmployeeQuestions, mainMenuQuestions, departmentNameQuestion, roleQuestions} = require("./questions")


//create a function to handle each switch case
// function viewAllEmployees() {
//   console.log("View All Employee!");
//   db.viewAllEmployees()
//     .then(([data]) => {
//       console.log("\n");
//       console.table(data);
//       showMainMenu();
//     })
//     .catch((err) => console.log("Error: ", err));

// }
async function viewAllEmployees() {
    console.log("View All Employees!");
    var [data] = await db.viewAllEmployees()
    console.log("\n");
    console.table(data);
    showMainMenu();  
  }

async function addEmployee() {
    console.log('addEmployee!');
    const [roleData] = await db.viewAllRoles()
    const roleChoices = roleData.map((item) => ({
      name: item.title,
      value: item.id,
    }));
    console.log(roleChoices);

    const [managerData] = await db.viewManagers();
    managerData.push({name: "None", value: null})
    console.log("managerData ", managerData);
    const answers = await inquirer.prompt(addEmployeeQuestions(roleChoices,managerData));
    //console.log(answers);
    try {
        const result = await db.addEmployee(answers.firstName, answers.lastName, answers.role, answers.manager);
        console.log("Result:", result);
    } catch (error) {
        console.error("Error ", error.message);
    }
    console.log("OUTSIDE TRY CATCH !!!:");
    showMainMenu();
    // return
    // //get all roles as select choice ({ name, value})
    // db.viewAllRoles()
    // .then(([data]) => {
    //   console.log("roleChoices returns ", roleChoices);
    //   //get all Employees for employees manager field
    //   db.viewAllEmployees()
    //     .then(([daupdateEmployeeRoleta]) => {
    //         console.log("managerChoice ", managerChoice);
    //     })
    //   //create prompts and thier choices
  
    //   //get answer from prompt and use prepared statements to insert into DB
    // })
    // .catch((err) => console.log("Error: ", err));

}

function updateEmployeeRole () {
    console.log('updateEmployeeRole!');
    // get a list of the employees (get Manager Data)

    //get a list of the available roles 
// const answers = await inquirer.prompt()
    // {employee_id: 4, new_role_id: 5}

    // await db.updateEmployeeRole(employee_id, new_role_id)
    // what will the new role be?
    showMainMenu();
}

function viewAllRoles() {
//   console.clear();
  console.log("Query view all roles:");
  db.viewAllRoles()
    .then(([data]) => {
      console.table("\n");
      console.table(data);
      showMainMenu();
    })
    .catch((err) => console.log("Error: ", err));

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

      inquirer.prompt(roleQuestions(departmentChoices))
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

    })
    .catch((err) => console.log("Error: ", err));
}

function addRole() {
    // console.clear();
    // console.log('addRole!');
    getDepartmentChoiceList();


    //createa  function to query and get all departments 
    // showMainMenu();
}

function viewAllDepartments() {
    // console.clear();
    db.viewAllDepartments()
      .then(([data]) => {
        console.log("\n");
        console.table(data);
        showMainMenu();
      })
      .catch((err) => console.log("Error: ", err));
      
}


function addDepartment() {
    // console.clear();
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
    console.log('Stopping Application');
    process.kill(0);
}

//starting menu
function showMainMenu() {
    console.log('\n');
    console.log('What would you like to do :');

    inquirer.prompt(mainMenuQuestions())
        .then(answer => {
            //console.log('mainMenuQuestions Answers : ', answer, answer.mainMenuChoice);
            // const selection = answer.mainMenuChoice;
            switch (answer.mainMenuChoice) {
              case "View All Employees":
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


