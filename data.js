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
var Team = mongoose.model('Team', { level: String, coach: String, gender: String, email: String, password: String  });

exports.getTeamByEmailAndPassword = function(email, password, res, callback){
  Team.find({email: email, password: password}, function(err, teams){
    callback(err, teams, res);
  })
}

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

exports.updateField = function(field, f){
  upsert(Field, field, f);
}

// -- Weeks
var Slot = new mongoose.Schema({date: String, startTime: Number, endTime: Number, fieldId: mongoose.Schema.Types.ObjectId, fulfilled: Boolean});


var Week = mongoose.model("Week", {weekNumber: Number, startDate: String, status: String, slots: [Slot]});

exports.getWeeks = function(res, callback) {
  Week.find({}, function(err, weeks){
    callback(err, weeks, res);
  })
}

exports.updateWeek = function(week, f){
  upsert(Week, week, f);
}