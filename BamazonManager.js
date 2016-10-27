// ====Bamazon=======

// Global Array
var globalArray = [];

// Low Array
var lowArray = [];

// Requires Inquirer
var inquirer = require('inquirer');

// Requires Mysql 
var mysql = require('mysql');

// Access MySql DB with these credentials
var connection = mysql.createConnection({
    host: "m7wltxurw8d2n21q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "i6oai8mwbalppv1r", 
    password: "bijnaanfteugfbil", 
    database: "j93r8dt8zd4aak0l"
})

// Verify's DB connection
connection.connect(function(err) {
    if (err) throw err;
    console.log();
})

// Starts the Inquirer list of options
var runOptions = function(){
    inquirer.prompt([
    {
	type: "list",
		message: "Which action would you like to perform?",
		choices: ["View ALL Inventory", "View Low Inventory", "Add to Inventory", "Add a New Product"],
		name: "action"
	}
])
    .then(function(answer) {
        switch(answer.action) {
            case "View ALL Inventory":
                viewTable();
                break; 

            case "View Low Inventory":
                showLow();
                break;
                
            case "Add to Inventory":
                updateProd();
                break;
            
            case "Add a New Product":
                console.log("HEY");
                insertNew();
                break; 
        }
  
    })
};



// If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

var viewTable = function(){

      connection.query('SELECT * FROM Products', function(err, res) {
     
    if (err) throw err;

        for (var i = 0; i < res.length; i++) {

        // console.log(res[i].ProductName);

        globalArray.push("Name: " + res[i].ProductName + " |" + "  Quantities: " + res[i].StockQuantity);
    
        }
		runOptions();
        console.log(globalArray);
    });
}
// If a manager selects `View Low Inventory`, then it should list all items with a inventory count lower than five

var showLow = function(){

    connection.query('SELECT * FROM Products where StockQuantity < 5', function(err,res) {
    
    if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            lowArray.push("Name: " + res[i].ProductName + " |" + "  Quantities: " + res[i].StockQuantity);
        }

        runOptions();
        console.log(lowArray);
    })
    
}

// If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store
var insertNew = function(){
        
    inquirer.prompt([{
        type: "input",
        message: "Enter the new item number?",
        choices: [""],
        name: "addNew"
    }])

        console.log("HEY2");

        connection.query("INSERT INTO Products (ItemID, ProductName, DepartmentName, Price, StockQuantity) VALUES (8, 'Lucky Lush Gin', 'Liquor', 3.25, 25 )", function(err, res){

            if(err) throw err;
    
            if (!err){
                console.log("HEY SUCCESSFUL INSERT");                
            }
        });
    }

//  If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store

// 	var insertNew = function(newOne){
//        var wordOne = process.argv[2] + process.argv[3] + process.argv[4] + process.argv[5];
//         inquirer.prompt({
//         // ItemID: 
//         // StockQuantity: 
        
// }).then(function(sendIt) {
//         var pushNew = ;
//         connection.query("INSERT INTO products SET ?", {
//     // ItemID: 
//     // StockQuantity: 
//     runOptions()
// }

runOptions();





