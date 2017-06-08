var AWS = require("aws-sdk"),
    _ = require('underscore');

AWS.config.loadFromPath('./awsConfig.json');
AWS.config.update({
  region: "eu-west-1",
  endpoint: "http://localhost:8000"
});

var dynamoose = require('dynamoose');
dynamoose.local();

var BasicMove = require('../models/basicMoveModel');

var BasicMoveDataAccess = {};

BasicMoveDataAccess.getBasicMoves = function(done) {
    BasicMove.scan().exec(function (err, basicMoves){
        if (err)
            console.log(err);
        else {
            console.log(basicMoves);
            done(basicMoves);
        }
    });
};

module.exports = BasicMoveDataAccess;