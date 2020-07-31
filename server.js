const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");



//conection variable
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "S1mmons1",
    port: 3306,
    database: "employee_db"
});


connection.connect(err => {
    if (err) throw err;
    console.log("greatSuccess");
    homeScreen();
});



//home screen async function waits for a choice then runs to kick off program.
const homeScreen = async () => {
    const { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View records", "Add records", "Update records", "Exit"]
    });

    switch (action) {
        case "View records":
            return viewAll();
        case "Add records":
            return addRecord();
        case "Update records":
            return updateRole();
        default:
            connection.end();
    }
}





//view all function




//add records function
const addRecord = async () => {
    const { recordType } = await inquirer.prompt([
        {
            type: "list",
            name: "recordType",
            message: "What would you like to add?",
            choices: ["New Department", "New Role", "New Employee", "Exit"]

        }
    ]);
    switch (recordType) {
        case "New Department":
            return newDepartment();
        case "New Role":
            return newRole();
        case "New Employee":
            return newEmployee();
        default:
            homeScreen();
    }
}

const newDepartment = async () => {
    const { name } = await inquirer.prompt([
        {
            name: "name",
            message: "What is the name of the new department you would like to add?"
        }
    ]);
    connection.query(
        "INSERT INTO departments SET ?",

        {
            name
        }
        ,
        (err) => {
            if (err) throw err;
            console.log(`Your new department, ${name} was successfully created!`);
            homeScreen();
        }
    )
}
const newRole = async () => {
    connection.query(
        "SELECT * FROM departments", async (err, departments) => {
            if (err) throw err;
            const allDepts = departments.map(department => ({ value: department.id, name: department.name }));
            const { title, salary, department_id } = await inquirer.prompt([
                {
                    name: "title",
                    message: "What is the title of the new role you would like to add?"
                },
                {
                    name: "salary",
                    message: "What is their expected salary?",
                    validate: (val) => isNaN(val) ? `'${val}' is not a valid bid amount!` : true
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Choose the department",
                    choices: allDepts
                }
            ]);
            connection.query(
                "INSERT INTO roles SET ?",

                {
                    title,
                    salary,
                    department_id
                }
                ,
                (err) => {
                    if (err) throw err;
                    console.log(`Your new role, ${title} was successfully created!`);
                    homeScreen();
                }
            )
        }
    )
}

const newEmployee = async () => {
    connection.query(
        "SELECT * FROM roles", async (err, roles) => {
            if (err) throw err;
            //const allDepts = departments.map(department => ({ value: department.id, name: department.name }));
            console.log(roles);
            const { title, salary, department_id } = await inquirer.prompt([
                {
                    name: "title",
                    message: "What is the title of the new role you would like to add?"
                },
                {
                    name: "salary",
                    message: "What is their expected salary?",
                    validate: (val) => isNaN(val) ? `'${val}' is not a valid bid amount!` : true
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Choose the department",
                    choices: allDepts
                }
            ]);
            connection.query(
                "INSERT INTO roles SET ?",

                {
                    title,
                    salary,
                    department_id
                }
                ,
                (err) => {
                    if (err) throw err;
                    console.log(`Your new role, ${title} was successfully created!`);
                    homeScreen();
                }
            )
        }
    )
}

