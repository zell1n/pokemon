"use strict";

var React = require('react');
var axios = require('axios');
var Router = require('react-router');
var Link = Router.Link;

var PokemonPage = React.createClass({
        getInitialState: function () {
        return {
            pokemon: {}
        }
    },

    componentDidMount: function() {
        axios.get('http://localhost:3001/pokemons/pokeIndex=' + this.props.params.pokeIndex)
        .then(res => {
            var pokemon = res.data;
            this.setState({ pokemon });
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    render: function() {
        return (
            <div>
                <h1>Detailed pokemon info:</h1>
                <p>{this.state.pokemon.pokemonName}</p>
                <img src={this.state.pokemon.urlPicture}/>
                <p><Link to="pokemons" className="btn btn-default">Go back</Link></p>
            </div>
        );
    }
});

module.exports = PokemonPage;