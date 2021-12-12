const express = require("express");
const app = express();
const mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors())

var UserArray = [];

//connect to database
var con = mysql.createConnection({
    host: "localhost",
    port: 3366,
    user: "root",
    password: "",
    database: "tbluser"
});

app.get("/get-all-user", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    con.query("SELECT * FROM user", function(err, result, fields) {
        if (err) throw err;
        UserArray = result;
    });
    res.status(200).json({ UserArray: JSON.stringify(UserArray) });
});

app.delete("/delete-user", (req, res) => {
    console.log(JSON.stringify(req.body));
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    con.query("DELETE FROM user where userId=" + req.body.user_id, function(err, result, fields) {
        if (err) throw err;
        console.log(result)
    });
    res.status(200).json({ message: "success" });
});

const PORT = process.env.PORT || 3033;

app.listen(PORT, console.log(`Server started on port ${PORT}`));