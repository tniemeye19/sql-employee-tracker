const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');

let departmentNameList = [];
let departmentIdList = [];
let roleNameList = [];
let employeeNameList = [];
let department_id;
let role_id;
let manager_id;

db.connect(function(err){
    if(err) {
        console.log('Error connecting to db')
    }
    console.log('connected to the db successfully')
    mainMenu();
})

function mainMenu() {
    updateDepartmentsLists();
    updateRolesLists();
    updateEmployeesLists();
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
                            choices: departmentNameList
                        }
                    ])
                    .then(answer => {
                        let title = answer.roleName;
                        let salary = answer.roleSalary;
                        let departmentName = answer.roleDepartment;
                        addRole(title, departmentName, salary);
                    });
                    break;
                case 'Add an employee':
                    inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'What is the employees first name?',
                            validate: nameInput => {
                                if (nameInput) {
                                    return true;
                                } else {
                                    console.log('Please enter the employees first name!');
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'What is the employees last name?',
                            validate: nameInput => {
                                if (nameInput) {
                                    return true;
                                } else {
                                    console.log('Please enter the employees last name!');
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'empRole',
                            message: 'What is the employees role?',
                            choices: roleNameList
                        },
                        {
                            type: 'list',
                            name: 'assignedManager',
                            message: 'Who does this employee report to?',
                            choices: employeeNameList
                        }
                    ])
                    .then(answer => {
                        let first_name = answer.firstName;
                        let last_name = answer.lastName;
                        let roleName = answer.empRole;
                        let manager = answer.assignedManager;
                        addEmployee(first_name, last_name, roleName, manager);
                    })

                    break;
                case 'Update an employee role':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'empToUpdateRole',
                            message: 'Which employee would you like to update the role for?',
                            choices: employeeNameList
                        },
                        {
                            type: 'list',
                            name: 'newRole',
                            message: 'What is the employees new role?',
                            choices: roleNameList
                        }
                    ])
                    .then(answer => {
                        let empName = answer.empToUpdateRole;
                        let empRole = answer.newRole;
                        updateEmployeeRole(empName, empRole);
                    })
                    break;
                case 'Update employee managers':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'eName',
                            message: "Which employee's manager do you want to update?",
                            choices: employeeNameList
                        },
                        {
                            type: 'list',
                            name: 'mName',
                            message: "Who is the employee's new manager?",
                            choices: employeeNameList
                        }
                    ])
                    .then(answer => {
                        let employeeName = answer.eName;
                        let managerName = answer.mName;
                        updateEmployeeManagers(employeeName, managerName);
                    })
                    break;
                case 'Delete department':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'delDep',
                            message: 'Which department would you like to delete?',
                            choices: departmentNameList
                        }
                    ])
                    .then(answer => {
                        let departmentDelete = answer.delDep;
                        deleteDepartment(departmentDelete);
                    })
                    break;
                case 'Delete role':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'delRole',
                            message: 'Which role would you like to delete?',
                            choices: roleNameList
                        }
                    ])
                    .then(answer => {
                        let roleDelete = answer.delRole;
                        deleteRoles(roleDelete);
                    })
                    break;
                case 'Delete employees':
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'delEmployee',
                            message: 'Which employee would you like to delete?',
                            choices: employeeNameList
                        }
                    ])
                    .then(answer => {
                        let employeeDelete = answer.delEmployee;
                        deleteEmployees(employeeDelete);
                    })
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
function addRole(title, departmentName, salary) {
    department_id = departmentNameList.indexOf(departmentName) + 1;
    
    const sql = `INSERT INTO roles (title, department_id, salary)
    VALUES
        ('${title}', ${department_id}, '${salary}')`;
    db.query(sql, (err, rows) => {
    if (err) throw err;
    console.log('\n');
    console.log(`
    =============================
    ADDING ${title} TO ROLES LIST
    =============================`);
    console.log('\n');
    mainMenu();
    })
}
function addEmployee(first_name, last_name, roleName, manager) {
    role_id = roleNameList.indexOf(roleName) + 1;
    manager_id = employeeNameList.indexOf(manager) + 1;

    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES
                    ('${first_name}', '${last_name}', ${role_id}, ${manager_id})`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`
        =============================
        ADDING ${first_name} ${last_name} TO EMPLOYEE LIST
        =============================`);
        console.log('\n');
        mainMenu();
    })
}
function updateEmployeeRole(empName, empRole) {
    employee_id = employeeNameList.indexOf(empName) + 1;
    role_id = roleNameList.indexOf(empRole) + 1;

    const sql = `UPDATE employees
                SET role_id = ${role_id}
                WHERE employees.id = ${employee_id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`
        ========================================
        UPDATING ${empName}'s ROLE TO ${empRole}
        ========================================`);
        console.log('\n');
        mainMenu();
    })
}
function updateEmployeeManagers(employeeName, managerName) {
    employee_id = employeeNameList.indexOf(employeeName) + 1;
    manager_id = employeeNameList.indexOf(managerName) + 1;

    const sql = `UPDATE employees
                SET manager_id = ${manager_id}
                WHERE employees.id = ${employee_id}`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`
        ====================================================
        UPDATING ${employeeName}'s MANAGER TO ${managerName}
        ====================================================`);
        console.log('\n');
        mainMenu();
    })
}
function deleteDepartment(departmentDelete) {
    department_id = departmentNameList.indexOf(departmentDelete) + 1;

    const sql = `DELETE FROM departments
                WHERE departments.id = ${department_id}`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`
        =======================================
        DELETING DEPARTMENT ${departmentDelete}
        =======================================`);
        console.log('\n');
        mainMenu();
    })
}
function deleteRoles(roleDelete) {
    role_id = roleNameList.indexOf(roleDelete) + 1;

    const sql = `DELETE FROM roles
                WHERE roles.id = ${role_id}`;
    
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`
        ===========================
        DELETING ROLE ${roleDelete}
        ===========================`);
        console.log('\n');
        mainMenu();
    })
}
function deleteEmployees(employeeDelete) {
    employee_id = employeeNameList.indexOf(employeeDelete) + 1;

    const sql = `DELETE FROM employees
                WHERE employees.id = ${employee_id}`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.log('\n');
        console.log(`
        ===================================
        DELETING EMPLOYEE ${employeeDelete}
        ===================================`);
        console.log('\n');
        mainMenu();
    })
}

// ----------------------------UTILITY FUNCTIONS BELOW----------------------------------------

// USED IN mainMenu switch statement to obtain data for use in addRole() function
function updateDepartmentsLists() {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        departmentNameList.length = 0;
        departmentIdList.length = 0;
        for (let i = 0; i < rows.length; i++) {
            let { id, name } = rows[i];
            let actual_id = id;
            let actual_name = name;
            departmentNameList.push(actual_name);
            departmentIdList.push(actual_id);
        }
    })
}
// USED IN mainMenu switch statement to obtain data for use in addEmployee() function
function updateRolesLists() {
    const sql = `SELECT * FROM roles`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        roleNameList.length = 0;
        for (let i = 0; i < rows.length; i++) {
            let { title } = rows[i];
            let actual_role = title;
            roleNameList.push(actual_role);
        }
    })
}
// USED IN mainMenu switch statement to obtain data for use in addEmployee() function
function updateEmployeesLists() {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        employeeNameList.length = 0;
        for (let i = 0; i < rows.length; i++) {
            let { first_name, last_name } = rows[i];
            let actual_full_name = `${first_name} ${last_name}`;
            employeeNameList.push(actual_full_name);
        }
    })
}