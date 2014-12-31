'use strict';
var calendarApp = angular.module('calendarApp', []);

calendarApp.controller('calendarController', function($scope, $http) {

  var teams = [];
  var fields = [];
  var reoccurs = [];
  var days = [
    {name: 'Monday', value: 0},
    {name: 'Tuesday', value: 1},
    {name: 'Wednesday', value: 2},
    {name: 'Thursday', value: 3},
    {name: 'Friday', value: 4},
    {name: 'Saturday', value: 5},
    {name: 'Sunday', value: 6}
    ];

  var getSlots = function(weekday){
    if (_.contains([0, 1, 2, 3, 4], weekday)){
      return [1800, 1930];
    } else {
      return [1000, 1130, 1300];
    }
  }

  var teamPromise = $http.get('/api/teams')
    .success(function(data){
      teams = data;
    })

  var fieldPromise = $http.get('/api/fields')
    .success(function(data){
      fields = data;
    })

  var reoccurPromise = $http.get('/api/reoccurs')
    .success(function(data){
      reoccurs = data.reoccurs;
    });

  teamPromise.then(function(){
    fieldPromise.then(function(){
      reoccurPromise.then(function(){
        mergeData();
      })
    })
  })

  var formatTime = function(n){
    var h = Number(String(n).substr(0, String(n).length - 2));
    var m = String(n).substr(String(n).length - 2, 2);
    var x = 'am';

    if (h > 12){
      h = h - 12;
      x = 'pm';
    }

    return h + ':' + m + x;
  }

  $scope.days = [];

  var mergeData = function(){
    _.each(days, function(day){
      var slots = getSlots(day.value);
      $scope.days[day.value] = {name: day.name, events: []};
      var events = [];
      _.each(fields, function(field){
        _.each(slots, function(slot){

          //check for a game.

          // check for a reoccurring practice
          var reoccur = _.find(reoccurs, function(r){return r.fieldId == field._id && r.startTime == slot && r.dayOfWeek == day.value})

          if (reoccur) {
            var team1 = _.find(teams, function(t){return t._id == reoccur.teamId})
            events.push(
              {timeSlot: slot, startTime: formatTime(slot), fieldName: field.description, team: team1.level + ' ' + team1.coach, open: false}
            )
          } else {
            events.push(
              {timeSlot: slot, startTime: formatTime(slot), fieldName: field.description, team: 'Open', open: true}
            )
          }

          // check for a fulfilled request

          // if not... then it's open

        })
      })

      $scope.days[day.value].events = _.sortBy(events, function(e){return e.timeSlot});
    })
  }

});

//var weekOf = new moment();
//
//var formatHeader = function(d){
//  var d = new moment(d);
//  $('h1').text('Week of ' + d.format("MMM DD") + ' to ' + d.add(6, 'days').format("MMM DD, YYYY"));
//}
//
//
//$(document).ready(function(){
//
//  weekOf = weekOf.add((weekOf.weekday() * -1) + 1, 'days');
//
//  formatHeader(weekOf);
//
//  $.ajax('/api/teams', function(data){
//    console.log(data);
//  })
//
//  $('.entry.open').click(function(){
//    window.location = '/request.html';
//  })
//
//  $('#previous').click(function(e){
//    weekOf = weekOf.add(-7, 'days');
//    formatHeader(weekOf);
//  })
//
//  $('#next').click(function(e){
//    weekOf = weekOf.add(7, 'days');
//    formatHeader(weekOf);
//  })
//});

