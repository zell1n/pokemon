var express = require('express');

var PokemonRouter = express.Router();

var pokemonDataAccess = require('../dataAccess/pokemonDataAccess');
var seedData = require('../dataAccess/seedData');

PokemonRouter.route('/all')
    .get(function(req, res){
        var pokemons = pokemonDataAccess.getPokemons(function(pokemons){
            res.status(200).json(pokemons);
        });
    });

PokemonRouter.route('/pokeIndex=:pokeIndex')
    .get(function(req, res){
        if (isNaN(req.params.pokeIndex)) {
            return res.status(400).send(`${req.params.pokeIndex} is not a number.`);
        }

        pokemonDataAccess.getPokemon(req.params.pokeIndex, function(pokemon){
            if (pokemon === undefined){
                res.status(404).json({});
            }
            res.json(pokemon);
        });
    });

PokemonRouter.route('/create')
    .get(function(req, res){
        var pokemon = createMockPokemon();

        pokemonDataAccess.createPokemon(pokemon, function(){
            res.status(201).send();
        });
    });

PokemonRouter.route('/delete')
    .get(function(req, res){
        pokemonDataAccess.deletePokemon(1, function() {
            res.status(204).send();
        });
    });

PokemonRouter.route('/batchDelete')
    .get(function(req, res){
        pokemonDataAccess.batchDelete(function() {
            res.status(204).send();
        });
    });

PokemonRouter.route('/seedPokemons')
    .put(function(req, res){
        seedData.readSpreadsheetToJson('./src/data/pokemon_go_spreadsheet.xlsx', './src/data/pokemons.json', 'Species Data', true, function(){
            seedData.writeJsonToDb('./src/data/pokemons.json', function(){
                console.log('Pokemon batch written to db.');
                res.status(204).send();
            });
        });
    });

module.exports = PokemonRouter;