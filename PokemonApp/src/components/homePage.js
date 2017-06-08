"use strict";

var React = require('react');

var HomePage = React.createClass({
    render: function (){
        return (
            <div className="jumbotron">
                <h1>Pokemon Go With React</h1>
                <p>React, React Router and Flux for responsive web apps.</p>
            </div>
        );
    }
});

module.exports = HomePage;