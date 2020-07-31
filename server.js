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
const viewAll = async () => {
    const { viewType } = await inquirer.prompt([
        {
            type: "list",
            name: "viewType",
            message: "How would you like to view company employees?",
            choices: ["View by Department", "View by Roles", "View All Employees"]
        }
    ]);
    switch (viewType) {
        case "View by Department":
            return viewDepartments();
        case "View by Roles":
            return viewRoles();
        case "View All Employees":
            return viewEmployees();
        default:
            homeScreen();
    }
}



const viewDepartments = async () => {
    connection.query(
        "SELECT * FROM departments", async (err, depts) => {
            if (err) throw err;
            console.table(`All Departments`, depts);
        })
}

const viewEmployees = () => {
    let query = "SELECT employees.first_name AS \"first\", employees.last_name AS \"last\", roles.title AS \"role\",  roles.salary, managers.first_name AS \"manager\"  FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees managers ON employees.manager_id = managers.id GROUP BY employees.id " ;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(`All Employees`, res);
    });
}

const viewRoles = () => {
    let query = "SELECT roles.*, departments.name FROM roles LEFT JOIN departments ON departments.id = roles.department_id";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(`All employees by Role`, res);
    });
}





//add record functions
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
            const allRoles = roles.map(role => ({ value: role.id, name: role.title }));
            const { first_name, last_name, role_id } = await inquirer.prompt([
                {
                    name: "first_name",
                    message: "What is their first name?"
                },
                {
                    name: "last_name",
                    message: "What is their last name?",

                },
                {
                    type: "list",
                    name: "role_id",
                    message: "Choose the role",
                    choices: allRoles
                }
            ]);
            connection.query(
                `SELECT * FROM employees WHERE role_id = ${role_id}`,
                async (err, managers) => {
                    const allManagers = managers.map(manager => ({ value: manager.id, name: `${manager.first_name} ${manager.last_name}` }));
                    allManagers.push({ value: null, name: "No Manager" })
                    const { manager_id } = await inquirer.prompt([
                        {
                            type: "list",
                            name: "manager_id",
                            message: "Choose the managers id",
                            choices: allManagers
                        }
                    ]);
                    connection.query(
                        "INSERT INTO employees SET ?",
                        {
                            first_name,
                            last_name,
                            role_id,
                            manager_id
                        }
                        ,
                        (err) => {
                            if (err) throw err;
                            console.log(`Your new employee, ${first_name} ${last_name} was successfully created!`);
                            homeScreen();
                        }
                    )
                }
            )
        }
    )
}

//Update functions

const updateDepartment = () => {
    connection.query("SELECT * FROM departments", async (err, depts) => {
        if (err) throw err;

        const { choice, newName } = await inquirer.prompt([
            {
                name: "choice",
                type: "rawlist",
                choices: depts,
                message: "What department do you want to rename?"
            },
            {
                name: "newName",
                message: "What would you like to call this new Department?"
            }
        ]);
        const chosenDepts = depts.find(dept => dept.name === choice);
        connection.query(
            "UPDATE departments SET ? WHERE ?",
            {
                name: newName
            }
        ),
            (err) => {
                if (err) throw err;
                console.log("did it");
                homeScreen();
            }
    })
}