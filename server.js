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
        choices: ["View all employees", "View departments", "Update employee role", "Exit"]
    });

    switch (action) {
        case "View all employees":
            return viewAll();
        case "View departments":
            return viewDepts();
        case "Update employee role":
            return updateRole();
        default:
            connection.end();
    }
}





//view all function



//view by department function


//update employee role