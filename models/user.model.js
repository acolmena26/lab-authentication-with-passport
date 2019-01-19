const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const WORK_FACTOR = 10;

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    require: [true, 'Email is required'],
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,10}$/, 'Invalid email format']
  },
  password: {
    type: String,
    require: true,
    minlength: [8, 'Needs at least 8 characters']
  }
}, { timestamps: true });

schema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}

schema.pre('save', function (next) {
  const user = this;
  
  if (user.isModified('password')) {
    bcrypt.genSalt(WORK_FACTOR)
        .then(salt => {
            return bcrypt.hash(user.password, salt)
                .then(hash => {
                    user.password = hash;
                    next();
                });
        })
        .catch(error => next(error));
} else {
    next();
}
});

const User = mongoose.model('User', schema);
module.exports = User;
