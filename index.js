const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');

db.connect(err => {
    if (err) throw err;
    mainMenu();
});

function mainMenu() {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: ['View all departments', 
                    'View all roles', 
                    'View all employees', 
                    'View employees by manager',
                    'View employees by department',
                    'Add a department', 
                    'Add a role', 
                    'Add an employee',
                    'Update an employee role',
                    'Update employee managers',
                    'Delete department',
                    'Delete role',
                    'Delete employees']
            }
        )
        .then(answer => {
            console.log('Answer: ', answer);

            switch(answer.choice){
                case 'View all departments':
                    console.log('View all departments selected');
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    console.log('View all roles selected');
                    viewAllRoles();
                    break;
                case 'View all employees':
                    console.log('View all employees selected');
                    viewAllEmployees();
                    break;
                case 'View employees by manager':
                    console.log('View employees by manager selected');
                    viewEmployeesByManager();
                    break;
                case 'View employees by department':
                    console.log('View employees by department selected');
                    viewEmployeesByDepartment();
                    break;
                case 'Add a department':
                    console.log('Add a department selected');
                    addDepartment();
                    break;
                case 'Add a role':
                    console.log('Add a role selected');
                    addRole();
                    break;
                case 'Add an employee':
                    console.log('Add an employee selected');
                    addEmployee();
                    break;
                case 'Update an employee role':
                    console.log('Update an employee role selected');
                    updateEmployeeRole();
                    break;
                case 'Delete department':
                    console.log('Delete department selected');
                    deleteDepartment();
                    break;
                case 'Delete roles':
                    console.log('Delete roles selected');
                    deleteRoles();
                    break;
                case 'Delete employees':
                    console.log('Delete employees selected');
                    deleteEmployees();
                    break;
                default:
                    mainMenu();
            }
        })
}

function viewAllDepartments() {
    console.log('Inside view all departments');
    // WHEN I choose to view all departments
    // THEN I am presented with a formatted table showing department names and department ids
    mainMenu();
}
function viewAllRoles() {
    console.log('Inside view all roles');
    // WHEN I choose to view all roles
    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    mainMenu();
}
function viewAllEmployees() {
    console.log('Inside view all employees');
    // WHEN I choose to view all employees
    // THEN I am presented with a formatted table showing
        // employee data, including
           // employee ids, 
           // first names, 
           // last names, 
           //  ]job titles, 
           // departments, 
           // salaries, and
           // managers that the employees report to
    mainMenu();
}
function viewEmployeesByManager() {
    console.log('Inside view employees by manager');
    mainMenu();
}
function viewEmployeesByDepartment() {
    console.log('Inside view employees by department');
    mainMenu();
}
function addDepartment() {
    console.log('Inside add department');
    // WHEN I choose to add a department
    // THEN I am prompted to
        // enter the name of the department and 
        //that department is added to the database
    mainMenu();
}
function addRole() {
    console.log('Inside add role');
    // WHEN I choose to add a role
    // THEN I am prompted to enter 
       // the name,
       // salary, and 
       // department for the role and that role is added to the database
    mainMenu();
}
function addEmployee() {
    console.log('Inside add employee');
    // WHEN I choose to add an employee
    // THEN I am prompted to enter the 
       // employee’s first name, 
       // last name,
       // role, and
       // manager and that employee is added to the database
    mainMenu();
}
function updateEmployeeRole() {
    console.log('Inside update employee');
    // WHEN I choose to update an employee role
    // THEN I am prompted to select an employee to update and
       // their new role and this information is updated in the database
    mainMenu();
}
function deleteDepartment() {
    console.log('Inside delete department');
    mainMenu();
}
function deleteRole() {
    console.log('Inside delete role');
    mainMenu();
}
function deleteEmployees() {
    console.log('Inside delete employees');
    mainMenu();
}



   

   

   

   
   

   

   
