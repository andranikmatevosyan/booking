var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var Order = require('../models/order');
var url = 'mongodb://localhost:27017/booking';


/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function (err, db) {
      assert.equal(null, err);
      var cursor = db.collection('orders').find();
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        resultArray.push(doc);
      }, function () {
          db.close();
          res.render('index', { title: 'Orders', items: resultArray});
      });
  });
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/admins/login');
}

module.exports = router;
