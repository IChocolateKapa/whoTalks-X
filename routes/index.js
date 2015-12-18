/**
 * Created by Echo on 2015/12/18.
 */
var express = require('express');
var router = express.Router();

/* first page user can access */
router.get('/', function(req, res, next) {
    res.render("login/login");
});



module.exports = router;
