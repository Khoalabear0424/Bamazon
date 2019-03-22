var mysql = require("mysql");
var inquirer = require("inquirer");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bamazon_db"
});
var result;
var questions = [
  {
    type: "input",
    message: "What is the ID of the product that you would like to purchase?",
    name: "productId"
  },
  {
    input: "input",
    message: "How many would you like to purchase?",
    name: "orderQuantity"
  },
  {
    type: "confirm",
    message: "Are you sure:",
    name: "confirm",
    default: true
  }
];

con.connect(function (err, result) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT * FROM products";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(
      `\nHere is our catalog! Please let us know what product you would like by identifying the Product ID \n\n Product ID  |  (Price)   Product Name`
    );

    for (let i in result) {
      if (i < 9) {
        console.log(`      ${result[i].id}      |  ($${result[i].price})  ${result[i].product_name}`);
      } else {
        console.log(`     ${result[i].id}      |  ($${result[i].price})  ${result[i].product_name}\n`);
      }
    }
    inquirer.prompt(questions).then(function (inquirerResponse) {
      // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
      if (inquirerResponse.confirm) {
        var { productId } = inquirerResponse;
        var { orderQuantity } = inquirerResponse;
        var updatedStockQuantity = 0;

        if (result[productId - 1].stock_quantity > orderQuantity) {
          updatedStockQuantity = result[productId - 1].stock_quantity - orderQuantity;
          console.log(
            `Receipt: ${result[productId - 1].product_name} x (${orderQuantity}) = $${orderQuantity * result[productId - 1].price}`);

          sql = `UPDATE products SET stock_quantity = ${updatedStockQuantity} WHERE id = ${productId}`;
          con.query(sql, function (err, result) {
            if (err) throw err;
          });

        } else if (result[productId - 1].stock_quantity > 0) {
          console.log(
            `There are only ${result[productId - 1].stock_quantity} left in stock!\n Here they are:\nReceipt: ${result[productId - 1].product_name} x (${result[productId - 1].stock_quantity}) = $${result[productId - 1].stock_quantity * result[productId - 1].price}`);

          sql = `UPDATE products SET stock_quantity = 0 WHERE id = ${productId}`;
          con.query(sql, function (err, result) {
            if (err) throw err;
          });

        } else {
          console.log(
            `There are no more ${result[productId - 1].product_name} left in stock!\nSorry!\nWe will restock next time you come back!`);
          sql = `UPDATE products SET stock_quantity = 10 WHERE id = ${productId}`;
          con.query(sql, function (err, result) {
            if (err) throw err;
          });
        }
      }
    });
  });
});


