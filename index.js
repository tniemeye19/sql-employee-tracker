const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');

db.connect(function(err){
    if(err) {
        console.log('Error connecting to db')
    }
    console.log('connected to the db successfully')
    mainMenu();
})

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
            switch(answer.choice){
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View employees by manager':
                    viewEmployeesByManager();
                    break;
                case 'View employees by department':
                    viewEmployeesByDepartment();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Delete department':
                    deleteDepartment();
                    break;
                case 'Delete roles':
                    deleteRoles();
                    break;
                case 'Delete employees':
                    deleteEmployees();
                    break;
                default:
                    mainMenu();
            }
        })
}

function viewAllDepartments() {
    // WHEN I choose to view all departments
    // THEN I am presented with a formatted table showing 
        // department names and department ids
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`
        =======================
        VIEWING ALL DEPARTMENTS
        =======================`);
        console.log('\n');
        console.table(rows);
        console.log('\n');
        mainMenu();
    });
    
}
function viewAllRoles() {
    // WHEN I choose to view all roles
    // THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`
        =================
        VIEWING ALL ROLES
        =================`)
        console.log('\n')
        console.table(rows);
        console.log('\n');
        mainMenu();
    })
}
function viewAllEmployees() {
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
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`
        =====================
        VIEWING ALL EMPLOYEES
        =====================`)
        console.log('\n')
        console.table(rows);
        console.log('\n');
        mainMenu();
    })
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



   

   

   

   
   

   

   
