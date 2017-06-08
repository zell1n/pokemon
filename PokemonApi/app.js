var express = require('express');

var app = express();
var cors = require('cors');

var port = process.env.PORT || '3000';

var pokemonRouter = require('./src/routes/pokemonRoutes');
var basicMoveRouter = require('./src/routes/basicMoveRoutes');

app.use(cors());
app.use('/pokemons', pokemonRouter);
app.use('/basicMove', basicMoveRouter);

app.listen(port, function(err){
    console.log('Running server on port ' + port);
});