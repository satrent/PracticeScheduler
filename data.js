var moment = require("./web/js/moment.min.js");
var _ = require('./web/js/underscore-min.js');
var config = require('./config.js');

var mongoose = require('mongoose');
mongoose.connect(config.getDatabaseConnection());

var upsert = function(model, data, f){
  if (!data._id) {
    model.create(data, f);
  } else {
    var id = data._id;
    delete data._id;
    model.findOneAndUpdate({_id: id}, data, f);
  }
}

// -- Requests
var Request = mongoose.model('Request', {teamId: mongoose.Schema.Types.ObjectId, date: String, startTime: Number, endTime: Number, fieldId: mongoose.Schema.Types.ObjectId, fulfilled: Boolean});

exports.getRequests = function(res, callback) {
  Request.find({}, function(err, reoccurs){
    callback(err, reoccurs, res);
  })
}

exports.updateRequest = function(request, f){
  upsert(Request, request, f);
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