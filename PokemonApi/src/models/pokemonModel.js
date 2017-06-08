var dynamoose = require('dynamoose');
var Schema = dynamoose.Schema;

var pokemonModel = new Schema({
    pokeIndex: {
        type: Number,
        required: true,
        hashKey: true
    },
    pokemonName: {
        type: String,
        required: true
    },
    type: {
        type: Array
    },
    urlPicture: {
        type: String
    }
});

module.exports = dynamoose.model('Pokemon', pokemonModel);