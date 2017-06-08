var express = require('express');

var app = express();
var cors = require('cors');

var port = process.env.PORT || '3000';

var pokemonRouter = require('./src/routes/pokemonRoutes');

app.use(cors());
app.use('/pokemons', pokemonRouter);

app.listen(port, function(err){
    console.log('Running server on port ' + port);
});