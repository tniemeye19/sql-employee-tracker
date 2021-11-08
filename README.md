# MYSQL EMPLOYEE TRACKER


## Licensing

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)
    


## Table of Contents

* [Installation](#installation)
    

* [Usage](#usage)
    

* [Contributing](#contributing)
    

* [Questions](#questions)
    
    


## Description

This SQL Employee Tracker allows the user to do the following: 
- GIVEN a command-line application that accepts user input
- WHEN I start the application
- THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
- THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
- WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database

This walkthrough video demonstrates how to invoke the application from the command line as well as the complete functionality of the application. Please click [here](https://watch.screencastify.com/v/tDCMvFCIz1x3yJx5bD6g) for the video.


## Installation

In order to be able to continue to the usage section, please follow the following instructions below:

- This app requires certain dependencies, so be sure to run the following commands in the terminal before trying to use the application:
    - `npm init`
    - `npm install mysql2`
    - `npm install inquirer`
    - `npm install console.table`

    

## Usage

In order to use this app you will need to first ensure that this app is connected to yout mysql shell. Log into the mysql from the command line using the following commands:
- `mysql -u root -p`
- Enter your password for mysql

You will now need to create the database for functionality. In order to do so as well as seed the database, please use the following commands once in the mysql shell:
- `source db/db.sql`
- `source db/schema.sql`
- `source db/seeds.sql`
- `quit`

Once you have completed these instructions, you can run `node index` to invoke the application.

If you need additonal guidance on how this app works, please refer to the Description sections walthrough video for additonal detail.
    

## Contributing

If you would like to contribute to this project, please adhere to the following guidelines: [Contributor Covenant](https://www.contributor-covenant.org/)



## Questions

If you have any questions about this project, please see my [Github](https://github.com/tniemeye19) or send me an [email](timothy.niemeyer19@gmail.com)!