var dynamoose = require('dynamoose');
var Schema = dynamoose.Schema;

var basicMoveModel = new Schema({
    id: {
        type: Number,
        required: true,
        hashKey: true
    },
    moveName: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    power: {
        type: Number
    },
    duration: {
        type: Number
    },
    dps: {
        type: String
    }
});

module.exports = dynamoose.model('BasicMove', basicMoveModel);