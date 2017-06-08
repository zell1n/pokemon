var express = require('express');

var BasicMoveRouter = express.Router();

var basicMoveDataAccess = require('../dataAccess/basicMoveDataAccess');
var seedData = require('../dataAccess/seedData');

BasicMoveRouter.route('/all')
    .get(function(req, res){
        var basicMoves = basicMoveDataAccess.getBasicMoves(function(basicMoves){
            res.status(200).json(basicMoves);
        });
    });

module.exports = BasicMoveRouter;