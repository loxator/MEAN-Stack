const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const passport = require('passport');

//Connect to DB
mongoose.connect(config.database);

//On Connect
mongoose.connection.on('connected',function () {
    console.log('Connected to database' + config.database);
})

//On Connect
mongoose.connection.on('error',function (err) {
    console.log('DB has error' + err);
})



const app = express();

const users = require('./routes/users');

const port = 3000;

//CORS middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

app.get('/',function (req,res) {
    res.send('Invalid endpoint');
})

app.listen(port,function () {
    console.log('Server started on port:' + port);
})
