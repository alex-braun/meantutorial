var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//this is where there router function is called.
var router = express.Router();
//uses the router exported function from app/routes/api.
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var passport = require('passport');
var social = require('./app/passport/passport')(app, passport);


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//this is how we let the front end access all of the files we have
app.use(express.static(__dirname + '/public'));
//this is where the /api route is added.
app.use('/api', appRoutes);
//http://localhost:8080/users =>
//http://localhost:8080/api/users
mongoose.connect('mongodb://localhost:27017/tutorial', function(err) {
  if (err) {
    console.log('Not Connected to the db: '+ err);
  } else {
    console.log('Successfully connected to MongoDB');
  }
});
//no matter where things are set, send index.html.
app.get('*', function(req,res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function() {
  console.log('Running the server on port ' + port);
});
