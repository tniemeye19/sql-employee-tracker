const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('constole.table');

const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');