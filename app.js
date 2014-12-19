var express = require('express');
var app = express();
var data = require('./data.js');
var bodyParser = require('body-parser');

app.use('/', express.static(__dirname + '/web/pages'));
app.use('/js', express.static(__dirname + '/web/js'));
app.use('/css', express.static(__dirname + '/web/css'));
app.use('/images', express.static(__dirname + '/web/images'));

app.use( bodyParser.json() );


app.get('/api/teams', function (req, res) {
  data.getTeams(res, function(err, teams, r){
    if (err){
      r.json(err);
    }
    r.json(teams);
  })
})

app.post('/api/team', function(req, res){
  data.updateTeam(req.body.team, function(result){
    res.json(result);
  })
})

var server = app.listen(8895, function () {
  var port = server.address().port
  console.log('app listening on %s', port)
})
