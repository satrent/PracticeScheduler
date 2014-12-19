var moment = require("./web/js/moment.min.js");
var _ = require('./web/js/underscore-min.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://web:boosters@ds063870.mongolab.com:63870/practicescheduler');

var Team = mongoose.model('Team', { level: String, coach: String, gender: String });

exports.getTeams = function(r, f) {
  Team.find({}, function(err, teams){
    console.log(r);
    if (err){
      console.log(err);
      f(err, null);
      console.log(err);
      return;
    }
    if (teams) {
      console.log(null, teams);
      f(null, teams, r);
      return;
    }
    f(err, null, r);
  })
}

exports.updateTeam = function(team, f){
  if (!team._id) {
    var team = new Team(team);
    team.save(function(err, team){
      f({result: !err, error: err, team: team});
    })
  } else {
    Team.update(team, function(err, team){
      f({result: !err, error: err, team: team});
    })
  }
}
