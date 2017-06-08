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

BasicMoveRouter.route('/seedBasicMoves')
    .put(function(req, res){
        seedData.readSpreadsheetToJson('./src/data/pokemon_go_spreadsheet.xlsx', './src/data/basicMoves.json', 'Basic Moves', false, function(){
            seedData.writeBasicMovesToDb('./src/data/basicMoves.json', function(){
                console.log('Pokemon batch written to db.');
                res.status(204).send();
            });
        });
    });

module.exports = BasicMoveRouter;