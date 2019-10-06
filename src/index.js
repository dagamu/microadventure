const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { url } = require('./database.js');

mongoose.connect(url, {
	useNewUrlParser: true
});


// settings
app.set('port', process.env.PORT || 3000);


// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));

// routes
// var usersRoutes = require('./routes/users.routes');
// app.use("/users", usersRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'));
});
