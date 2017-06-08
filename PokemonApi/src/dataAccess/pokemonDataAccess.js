var AWS = require("aws-sdk"),
    _ = require('underscore');

AWS.config.loadFromPath('./awsConfig.json');
AWS.config.update({
  region: "eu-west-1",
  endpoint: "http://localhost:8000"
});

var dynamoose = require('dynamoose');
dynamoose.local();

var Pokemon = require('../models/pokemonModel');
var BasicMove = require('../models/basicMoveModel');

var PokemonDataAccess = {};

PokemonDataAccess.getPokemons = function(done){
    Pokemon.scan().exec(function (err, pokemons){
        if (err)
            console.log(err);
        else {
            console.log(pokemons);
            done(pokemons);
        }
    });
};

PokemonDataAccess.getPokemon = function(id, done){
    Pokemon.get(id, function (err, pokemon){
        if (err)
            console.log(err);
        else {
            console.log(pokemon);
            done(pokemon);
        }
    });
};

PokemonDataAccess.createPokemon = function(pokemonToAdd, done){
    var pokemon = new Pokemon(pokemonToAdd);

    pokemon.save(function (err) {
        if (err) {
            console.log(err);
        }
        done();
    });
};

PokemonDataAccess.deletePokemon = function(id, done){
    Pokemon.delete(id, function(err) {
        if(err) {
            console.log(err); 
        }
        console.log('Pokemon deleted');
        done();
    });
};

PokemonDataAccess.batchDelete = function(done){
    var list = [];

    PokemonDataAccess.getPokemons(function(pokemons){
        _.each(pokemons, function(value, key){
            list.push({ pokeIndex: value.pokeIndex });
        });

        Pokemon.batchDelete(list, function(err){
            if (err){
                console.log(err);
            }
            console.log('Batch delete');
            done();
        });
    });
};

module.exports = PokemonDataAccess;