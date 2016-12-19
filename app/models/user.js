var mongoose = require('mongoose');
//encrypting password data
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');


var nameValidator = [
  validate({
    validator: 'matches',
    arguments: /^(([a-zA-Z]{1,20})+[ ]+([a-zA-Z]{1,20})+)$/,
    message: 'Name must be at least 3 characters or numbers, max 30, no special characters, must have space in between name'
  }),
  validate({
    validator: 'isLength',
    arguments: [3, 30],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Please provide a valid email address'
  }),
  validate({
    validator: 'isLength',
    arguments: [3, 30],
    message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var userNameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 30],
    message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
  }),
  validate({
    validator: 'isAlphanumeric',
    message: 'Username must contain letters and numbers only'
  })
];

var passwordValidator = [
  validate({
    validator: 'matches',
    arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
    message: 'Passwords must be at least 8 characters long, must contain at least one special character, one uppercase and lowercase letter, and one number.'
  }),
  validate({
    validator: 'isLength',
    arguments: [8, 35],
    message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];


// var bcrypt = require('')
var UserSchema = new Schema({
  name: { type: String, required: true, validate: nameValidator },
  username: { type: String, lowercase: true, required: true, unique: true, validate: userNameValidator },
  password: { type: String, required: true, validate: passwordValidator },
  email: { type: String, required: true, lowercase: true, unique: true, validate: emailValidator }
});
//.pre in mongoose asks that before action is made, go through these steps first. (before saving, do this one thing).
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.plugin(titlize, {
  paths: [ 'name' ] // Array of paths
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
