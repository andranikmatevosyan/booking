var express = require('express');
var router = express.Router();

var Order = require('../models/order');

/* GET Orders listing. */
router.get('/orders', function(req, res) {
    Order.getOrders(function (err, orders) {
        if(err) throw err;
        res.json(orders);
    })
});

/* GET Order */
router.get('/orders/:_id', function(req, res) {
    Order.getOrderById(req.params._id, function (err, order) {
        if(err) throw err;
        res.json(order);
    })
});

/* POST Order */
router.post('/orders', function(req, res) {
    var order = req.body;
    Order.addOrder(order, function (err, order) {
        if(err) {
            throw err;
        }

        res.json(order);
    })
});

module.exports = router;