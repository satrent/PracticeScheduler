var express = require('express');
var app = express();
var data = require('./data.js');
var bodyParser = require('body-parser');

app.use('/', express.static(__dirname + '/web/pages'));
app.use('/js', express.static(__dirname + '/web/js'));
app.use('/css', express.static(__dirname + '/web/css'));
app.use('/images', express.static(__dirname + '/web/images'));

app.use( bodyParser.json() );


// -- Teams
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

// -- Reoccurring Schedules
app.get('/api/reoccurs', function(req, res){
  data.getReoccurs(res, function(err, reoccurs, r){
    r.json(reoccurs, err);
  })
})

app.post('/api/reoccur', function(req, res){
  data.updateReoccur(req.body.reoccur, function(result){
    res.json(result);
  })
})

// -- Fields
app.get('/api/fields', function(req, res){
  data.getFields(res, function(err, fields, r){
    r.json(fields);
  })
})

app.post('/api/field', function(req, res){
  data.updateField(req.body.field, function(result){
    res.json(result);
  })
})


// - Start Server
var server = app.listen(8895, function () {
  var port = server.address().port
  console.log('app listening on %s', port)
})
