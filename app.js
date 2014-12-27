var express = require('express');
var app = express();
var data = require('./data.js');
var bodyParser = require('body-parser');
var _ = require('./web/js/underscore-min.js');

app.use('/', express.static(__dirname + '/web/pages'));
app.use('/js', express.static(__dirname + '/web/js'));
app.use('/css', express.static(__dirname + '/web/css'));
app.use('/images', express.static(__dirname + '/web/images'));

app.use( bodyParser.json() );


var teams = [];
var fields = [];

// -- Teams
app.get('/api/teams', function (req, res) {
  if (teams.length > 0){
    res.json(teams);
    return;
  }

  data.getTeams(res, function(err, data, r){
    if (err){
      r.json(err);
      return;
    }
    teams = data;
    r.json(teams);
  })
})

app.post('/api/team', function(req, res){
  teams = [];
  data.updateTeam(req.body.team, function(result){
    res.json(result);
  })
})

// -- Reoccurring Schedules
app.get('/api/reoccurs', function(req, res){
  data.getReoccurs(res, function(err, reoccurs, r){
    if (err) {
      r.json(err);
      return;
    }

    r.json({
      reoccurs: reoccurs,
      teams: teams,
      fields: fields
    });
  })
})

app.post('/api/reoccur', function(req, res){
  data.updateReoccur(req.body.reoccur, function(result){
    res.json(result);
  })
})

// -- Fields
app.get('/api/fields', function(req, res){
  if (fields.length > 0){
    res.json(fields);
    return;
  }
  data.getFields(res, function(err, data, r){
    fields = data;
    r.json(fields);
  })
})

app.post('/api/field', function(req, res){
  fields = [];
  data.updateField(req.body.field, function(result){
    res.json(result);
  })
})


// - Start Server
var server = app.listen(8895, function () {
  var port = server.address().port
  console.log('app listening on %s', port)
})
