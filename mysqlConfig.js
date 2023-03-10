var mysql = require('mysql');
var fs = require('fs');

var config =
{
  host:"", 
  user:"", password:"",
  database:"", 
  port:3306, 
  socketPath: '/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock',
  ssl:{ca:fs.readFileSync("/Users/admin/Downloads/vsc/github-projects/live-chatapp/mysql/mysql.txt")}}

const conn = new mysql.createConnection(config);

conn.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
        console.log("Connection established.");
    }
});
    