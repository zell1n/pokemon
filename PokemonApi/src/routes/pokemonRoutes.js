var express = require('express');

var pokemonRouter = express.Router();

var pokemonDataAccess = require('../dataAccess/pokemonDataAccess');
var seedData = require('../dataAccess/seedData');

pokemonRouter.route('/all')
    .get(function(req, res){
        var pokemons = pokemonDataAccess.getPokemons(function(pokemons){
            res.status(200).json(pokemons);
        });
    });

pokemonRouter.route('/pokeIndex=:pokeIndex')
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

pokemonRouter.route('/create')
    .get(function(req, res){
        var pokemon = createMockPokemon();

        pokemonDataAccess.createPokemon(pokemon, function(){
            res.status(201).send();
        });
    });

pokemonRouter.route('/delete')
    .get(function(req, res){
        pokemonDataAccess.deletePokemon(1, function() {
            res.status(204).send();
        });
    });

pokemonRouter.route('/batchDelete')
    .get(function(req, res){
        pokemonDataAccess.batchDelete(function() {
            res.status(204).send();
        });
    });

pokemonRouter.route('/seedPokemons')
    .put(function(req, res){
        seedData.readSpreadsheetToJson('./src/data/pokemon_go_spreadsheet.xlsx', './src/data/pokemons.json', 'Species Data', true, function(){
            seedData.writeJsonToDb('./src/data/pokemons.json', function(){
                console.log('Pokemon batch written to db.');
                res.status(204).send();
            });
        });
    });

pokemonRouter.route('/seedBasicMoves')
    .put(function(req, res){
        seedData.readSpreadsheetToJson('./src/data/pokemon_go_spreadsheet.xlsx', './src/data/basicMoves.json', 'Basic Moves', false, function(){
            seedData.writeBasicMovesToDb('./src/data/basicMoves.json', function(){
                console.log('Pokemon batch written to db.');
                res.status(204).send();
            });
        });
    });

function createMockPokemon(){
    var pokemon = {
        pokeIndex: 3,
        pokemonName: 'testPokemon3',
        type: [
            'type1',
            'type3'
        ],
        urlPicture: 'url123'
    }

    return pokemon;
}

function getPokemonPicUrl(){
    var options = {
        headers: { 'user-agent': 'node.js' }
    }

    var url = 'http://www.ign.com/wikis/pokemon-go/List_of_Pokemon_(Pokedex)';

    request(url, options, function(error, response, html){
        if (!error){
            var $ = cheerio.load(html);

            var filter = $('.gh-content table div');

            filter.each(function(index){
                if (index >= pokemons.length){
                    return;
                }

                var picUrl = $(this).find('img').attr('data-original');

                pokemons[index].urlPic = picUrl;
            });
        }
    });
}

module.exports = pokemonRouter;