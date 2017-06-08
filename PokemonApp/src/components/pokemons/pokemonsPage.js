"use strict";

var React = require('react');
var axios = require('axios');
var _ = require('underscore');

var PokemonList = require('./pokemonList');

var PokemonsPage = React.createClass({
    getInitialState: function () {
        return {
            pokemons: []
        }
    },

    componentDidMount: function() {
        axios.get('http://localhost:3001/pokemons/all')
        .then(res => {
            var pokemons = res.data;
            pokemons = _.sortBy(pokemons, 'pokeIndex');
            this.setState({ pokemons });
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    render: function() {
        return (
            <div>
                <h1>Pokemons</h1>
                <PokemonList pokemons={this.state.pokemons} />
            </div>
        );
    }
});

module.exports = PokemonsPage;