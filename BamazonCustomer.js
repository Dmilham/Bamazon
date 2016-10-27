    // ====Bamazon=======

    // Requires Inquirer
    var inquirer = require('inquirer');

    // Requires Mysql 
    var mysql = require('mysql');

    var globalArray = [];
    var choices = [];

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

// Displays List Of Items For Sale By Number Name and Price
    var viewTable = function(){

      connection.query('SELECT ItemID,ProductName,Price FROM Products;', function(err, res) {
     
    if (err) throw err;

    console.log(res)


        for (var i = 0; i < res.length; i++) {

        globalArray.push("ItemID: " + res[i].ItemID + "  | Product Name: " + res[i].ProductName +  "  | Price of Product: " + res[i].Price);
        
        choices.push(res[i].ItemID);
    	
        }

        console.log("===============================================================================");
        console.log(globalArray);
        console.log("===============================================================================");

        custQuestions();
    // console.log(globalArray)
    // console.log(res[i].ItemID, choices[i].ProductName, [i].Price);
    })
}


    var custQuestions = function(){

    inquirer.prompt([

        {
            
             type: "input",
             message: "Please Enter Your Item Number",
             name: "number"

        },
        
        {
            
             type: "input",
             message: "How Many Would you like to buy?",
             name: "qty"

        }

    ]).then(function(resp){

      console.log("HEEEELLLLP" + resp)

      var custItem = "number";

        connection.query ('SELECT * FROM Products WHERE ItemID =' + custItem),
        
        // return resp.qty
       

        console.log(resp.number);

        // Create a number
        var amount = "qty";

        connection.query ('SELECT * FROM Products WHERE StockQuantity =' + amount)

        console.log("quantity on hand is: " + resp.StockQuantity );

    })

    // connection.query('SELECT DISTINCT * FROM Products WHERE StockQuantity = ' + number);

}

    viewTable();



