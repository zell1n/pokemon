"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
    render: function() {
        return (
            <div>
                <h1>404: Page Not Found</h1>
                <p>The resource you are looking for is not available.</p>
                <p><Link to="app">Back to Home</Link></p>
            </div>
        );
    }
});

module.exports = NotFoundPage;