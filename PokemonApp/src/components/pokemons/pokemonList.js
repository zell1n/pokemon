"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var PokemonList = React.createClass({
    propTypes: {
        pokemons: React.PropTypes.array.isRequired
    },
    render: function() {
        var createPokemonRow = function(pokemon) {
            return (
                <tr key={pokemon.pokeIndex}>
                    <td>{pokemon.pokeIndex}</td>
                    <td>{pokemon.pokemonName}</td>
                    <td><Link to="pokemon" params={{pokeIndex: pokemon.pokeIndex}}><img src={pokemon.urlPicture}/></Link></td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.pokemons.map(createPokemonRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = PokemonList;