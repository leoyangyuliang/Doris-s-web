//Paul Miller	Yuliang Yang
//declaration
var express = require('express');
var app = express();
var path = require('path');
var mysql      = require('mysql');

//configuration
var connection = mysql.createConnection({
    host     : 'leoyang.cjieasm0avvk.us-east-2.rds.amazonaws.com',
    user     : 'yangyuliang',
    password : '49876aaa',
    database : 'yangyuliang'
});


app.use(express.static('public'));
app.get('/',function(req,res){
  res.sendFile(path.resolve('public/index.html'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 8081!');
});

//connect to database
// connection.connect(function(err){
// if(!err) {
//     console.log("Database is connected ... nn");
// } else {
//     console.error("Error connecting database ... nn");
// }
// });


    app.get('/check',function(req,res){
        //console.log('The solution is: ', rows);
        const name = (req.query.name);
//console.log(name);
        var sql2 = "SELECT * FROM customer_tracking2 ORDER BY 创建时间 DESC "
        var sql = "SELECT * FROM customer_tracking2 WHERE 收件人姓名 = '" + name + "' ORDER BY 创建时间 DESC ";
        //database fetching

          connection.query(sql , function(err, rows, fields) {
            if (!err){
              //console.log(rows);
              res.json(rows);
              console.log('successfully fetch data from database');
            }
          else
          {
            console.log(err);
            console.log('Error while performing Query.');
          }
          });

        //fetching over

  });



// app.get('/check',function(req,res){
//         connection.query('SELECT * FROM customer_tracking2 ORDER BY 创建时间 DESC', function(err, rows, fields) {
//   if (!err){
//         console.log('The solution is: ', rows);
//         res.json(rows);
//       }
//       else
//        console.log('Error while performing Query.');
//       });
//   });



//connection.end();




// Listen on port 8081
app.listen(8081);
