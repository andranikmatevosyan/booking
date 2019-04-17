var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/booking', { useNewUrlParser: true });
// var db = mongoose.connection;

// Order Schema
var orderSchema = mongoose.Schema({
   name:{
       type:String,
       required:true
   },
    surname:{
       type:String,
        required:true
    },
    mail:{
       type:String,
        required:true
    },
    phone:{
       type:String,
        required:true
    },
    time:{
       type:String,
        required:true
    },
    day:{
       type:String,
        required:true
    },
    created_date:{
       type:Date,
        default:Date.now
    },
});

var Order = module.exports = mongoose.model('Order', orderSchema);

// Get Orders
module.exports.getOrders = function (callback, limit) {
    Order.find(callback).limit(limit)
};

// Get Order
module.exports.getOrderById = function (id, callback) {
    Order.findById(id, callback);
};

// Add Order
module.exports.addOrder = function (order, callback) {
    Order.create(order, callback);
};


