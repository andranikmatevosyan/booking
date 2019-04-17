var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/booking', { useNewUrlParser: true });
var db = mongoose.connection;

// Admin Schema
var AdminSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        index:true
    },
    password:{
        type:String,
        required:true
    }
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.getAdminById = function(id, callback) {
    Admin.findById(id, callback);
};

module.exports.getAdminByUsername = function(username, callback) {
    var query = {username: username};
    Admin.findOne(query, callback);
};

module.exports.comparePassword = function(candidatPassword, hash, callback) {
    bcrypt.compare(candidatPassword, hash, function(err, isMatch) {
        callback(null, isMatch);
    });
};

module.exports.createAdmin = function(newAdmin, callback) {
    bcrypt.genSalt(10, function (err, salt) {
       bcrypt.hash(newAdmin.password, salt, function (err, hash) {
           newAdmin.password = hash;
           newAdmin.save(callback);
       });
    });

    // Admin.create(newAdmin, callback);
};
