var express = require('express');
var app = express();
var data = require('./data.js');
var bodyParser = require('body-parser');
var _ = require('./web/js/underscore-min.js');
var moment = require('./web/js/moment.min.js');
var jwtAuth = require('express-jwt');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

app.use('/', express.static('./web/pages'));
app.use('/js', express.static('./web/js'));
app.use('/css', express.static('./web/css'));
app.use('/images', express.static('./web/images'));

app.use( bodyParser.json() );
app.use( cookieParser() );
app.use('/api', jwtAuth({secret: 'fk139d0sl30sl'}));

app.post('/login', function(req, res){

  var password = crypto.createHash('md5').update(req.body.password).digest('hex');

  data.getTeamByEmailAndPassword(req.body.email, password, res, function(err, data, r){
    if (err || !data || data.length == 0){
      r.send(401, 'user/password not found');
      return;
    }

    var profile = {
      coach: data[0].coach,
      level: data[0].level,
      gender: data[0].gender,
      email: data[0].email
    }
    
    var token = jwt.sign(profile, 'fk139d0sl30sl');

    res.cookie('authToken', token, 0);
    res.json({result: true});
  })
})


var teams = [];
var fields = [];
var requests = [];

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


// -- Requests!
app.get('/api/requests', function(req, res){
  if (requests.length > 0){
    res.json(requests);
    return;
  }
  data.getRequests(res, function(err, data, r){
    requests = data;
    r.json(requests);
  })
})

app.post('/api/request', function(req, res){
  requests = [];
  req.body.request.fulfilled = false;
  data.updateRequest(req.body.request, function(result){
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


// -- Weeks
app.get('/api/weeks', function(req, res){
  data.getWeeks(res, function(err, data, r){
    r.json(data);
  })
})


app.post('/api/week', function(req, res){
  var week = req.body.week;

  // validation. Check that the start date is a Monday.
  var m = new moment(week.startDate);

  if (m.weekday() != 1){
    res.json({errors: ['start date must be a Monday']});
    return;
  }

  data.updateWeek(week, function(result){
    res.json(result);
  })
})

// - Start Server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  console.log('app listening %s', process.env.PORT)
})
