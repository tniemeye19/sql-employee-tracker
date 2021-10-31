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
    // updateDepartmentsTable();
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
                    'Delete employees',
                    'Exit']
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
                    inquirer
                    .prompt(
                        {
                            type: 'input',
                            name: 'departmentName',
                            message: 'What would you like to name the new department?',
                            validate: nameInput => {
                                if (nameInput) {
                                    return true;
                                } else {
                                    console.log('Please enter the name of the department you would like to create!');
                                }
                            }
                        }
                    )
                    .then(answer => {
                        let depName = answer.departmentName;
                        addDepartment(depName);
                    });
                    break;
                case 'Add a role':
                    updateDepartmentsTable();
                    inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'roleName',
                            message: 'What would you like to name the new role?',
                            validate: nameInput => {
                                if (nameInput) {
                                    return true;
                                } else {
                                    console.log('Please enter the name of the role you would like to create!');
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'roleSalary',
                            message: 'What would you like the salary to be for this role?',
                            validate: nameInput => {
                                if (nameInput) {
                                    return true;
                                } else {
                                    console.log('Please enter the salary you would like this role to have!');
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'roleDepartment',
                            message: 'What department would you like this role to fall under?',
                            choices: departmentList,
                            validate: nameInput => {
                                if (nameInput) {
                                    return true;
                                } else {
                                    console.log('Please enter the department you would like this role to fall under!');
                                }
                            }
                        }
                    ])
                    .then(answer => {
                        let r = answer.roleName;
                        let rSalary = answer.roleSalary;
                        let rDepartment = answer.roleDepartment;
                        addRole(r, rSalary, rDepartment);
                    });
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
                case 'Exit':
                    db.destroy();
                    process.exit(0);
                default:
                    mainMenu();
            }
        })
}

function viewAllDepartments() {
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
    const sql = `SELECT roles.id, roles.title, departments.name AS department_name, roles.salary
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`
        =================
        VIEWING ALL ROLES
        =================`);
        console.log('\n');
        console.table(rows);
        console.log('\n');
        mainMenu();
    })
}
function viewAllEmployees() {
    const sql = `SELECT e.id, e.first_name, e.last_name, roles.title AS role, departments.name as department, roles.salary AS salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
                FROM employees e
                LEFT JOIN roles
                ON e.role_id = roles.id
                LEFT JOIN departments
                ON roles.department_id = departments.id
                LEFT JOIN employees m
                ON m.id = e.manager_id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`
        =====================
        VIEWING ALL EMPLOYEES
        =====================`);
        console.log('\n');
        console.table(rows);
        console.log('\n');
        mainMenu();
    })
}
function viewEmployeesByManager() {
    console.log('Inside view employees by manager');
    mainMenu();
}
function viewEmployeesByDepartment() {
    console.log('Inside view employees by department');
    mainMenu();
}
function addDepartment(depName) {
    const sql = `INSERT INTO departments (name)
                VALUES
                    ('${depName}')`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`
        ====================================
        ADDING ${depName} TO DEPARTMENT LIST
        ====================================`);
        console.log('\n');
        mainMenu();
    })
}
function addRole(r, rSalary, rDepartment) {
    let title = r;
    let salary = rSalary;
    let department_name = rDepartment;
    console.log(`
    Title: ${title} \n
    Salary: ${salary} \n
    Department Name: ${department_name} \n`);
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
function deleteRoles() {
    console.log('Inside delete role');
    mainMenu();
}
function deleteEmployees() {
    console.log('Inside delete employees');
    mainMenu();
}
function updateDepartmentsTable () {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        let departmentList = [];
        for (let i = 0; i < rows.length; i++) {
            let { id, name } = rows[i];
            actual_id = id;
            actual_name = name;
            departmentList.push(actual_name);
            console.log(departmentList);
        }
    })
}