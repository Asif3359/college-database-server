const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

const port = process.env.PORT || 5000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "college",
})

db.connect();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/student', (req, res) => {
    const sqlGet = 'select * from student';
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
            return;
        }
        const data = result;
        res.send(data);
    });
});
app.get('/studentDetails/:id', (req, res) => {
    const id = req.params.id;
    const sqlGet = "SELECT * FROM student WHERE id=?";
    db.query(sqlGet, [id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
            return;
        }
        const data = result[0];
        res.send(data);
    });
});
app.post('/insert', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const cgpa = req.body.cgpa;
    const email = req.body.email;
    const phone = req.body.phone;

    const sqlGet = "INSERT INTO student (id , Name, Email, Phone, cgpa) VALUES (?,?,?,?,?)";
    db.query(sqlGet, [id, name, email, phone, cgpa], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
            return;
        }
        const data = result;
        res.send(data);
    });
});



app.get('/', (req, res) => {
    res.send("hello World");
})



app.listen(port, () => {
    console.log('college server running on port 5000');
})


