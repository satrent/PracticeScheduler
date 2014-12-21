var moment = require("./web/js/moment.min.js");
var _ = require('./web/js/underscore-min.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://web:boosters@ds063870.mongolab.com:63870/practicescheduler');

var upsert = function(model, data, f){
  if (!data._id) {
    model.create(data, f);
  } else {
    var id = data._id;
    delete data._id;
    model.findOneAndUpdate({_id: id}, data, f);
  }
}

// -- Teams
var Team = mongoose.model('Team', { level: String, coach: String, gender: String });

exports.getTeams = function(res, callback) {
  Team.find({}, function(err, teams) {
    callback(err, teams, res);
  })
}

exports.updateTeam = function(team, f){
  upsert(Team, team, f);
}

// -- Reoccurring Schedules
var Reoccur = mongoose.model('Reoccur', {teamId: mongoose.Schema.Types.ObjectId, dayOfWeek: Number, startTime: Number, endTime: Number, fieldId: mongoose.Schema.Types.ObjectId});

exports.getReoccurs = function(res, callback) {
  Reoccur.find({}, function(err, reoccurs){
    callback(err, reoccurs, res);
  })
}

exports.updateReoccur = function(reoccur, f){
  upsert(Reoccur, reoccur, f);
}

// -- Fields
var Field = mongoose.model('Field', {code: String, description: String});

exports.getFields = function(res, callback) {
  Field.find({}, function(err, fields){
    callback(err, fields, res);
  })
}

//  This one is the one that currently works for both update and create.
exports.updateField = function(field, f){
  upsert(Field, field, f);
}