'use strict';
var calendarApp = angular.module('calendarApp', []);

calendarApp.controller('calendarController', function($scope, $http) {

  var today = new moment();
  var seasonStart = new moment({year: 2015, month: 3, day: 5});

  if (today.isBefore(seasonStart)){
    today = seasonStart;
  }

  var weekStart = today.add(today.weekday() * -1, 'day');

  $scope.startDate = weekStart.format("MMM DD, YYYY");;


  $scope.previousWeek = function(){
    var m = new moment($scope.startDate);
    m = m.subtract(7, 'day');
    $scope.startDate = m.format("MMM DD, YYYY");
  }

  $scope.nextWeek = function() {
    var m = new moment($scope.startDate);
    m = m.add(7, 'day');
    $scope.startDate = m.format("MMM DD, YYYY");
  }


  var teams = [];
  var fields = [];

  var days = [
    {name: 'Monday', value: 0, date: weekStart},
    {name: 'Tuesday', value: 1, date: weekStart.add(1, 'day')},
    {name: 'Wednesday', value: 2, date: weekStart.add(2, 'day')},
    {name: 'Thursday', value: 3, date: weekStart.add(3, 'day')},
    {name: 'Friday', value: 4, date: weekStart.add(4, 'day')},
    {name: 'Saturday', value: 5, date: weekStart.add(5, 'day')},
    {name: 'Sunday', value: 6, date: weekStart.add(6, 'day')}
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
      $scope.teamOptions =[];

      _.each(teams, function(team){
        $scope.teamOptions.push({value: team._id, name: team.coach + ' - ' + team.level})
      })

    })

  var fieldPromise = $http.get('/api/fields')
    .success(function(data){
      fields = data;
    })

  teamPromise.then(function(){
    fieldPromise.then(function(){
      mergeData();
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

  $scope.request = function(entry){
    $scope.selectedSlot = {
      startTime: entry.startTime,
      timeSlot: entry.timeSlot,
      fieldName: entry.fieldName,
      fieldId: entry.fieldId
    };
  }

  $scope.cancel = function() {
    $scope.selectedSlot = null;
  }

  $scope.requestSlot = function(){
    var request = {
      _id: null,
      teamId: $scope.selectedSlot.teamId,
      fieldId: $scope.selectedSlot.fieldId,
      startTime: $scope.selectedSlot.timeSlot
    }

    $http.post('/api/request', {request: request})
      .success(function(data){
        console.log(data);

      })

  }

  var mergeData = function(){
    _.each(days, function(day){
      var slots = getSlots(day.value);
      $scope.days[day.value] = {name: day.name, events: []};
      var events = [];
      _.each(fields, function(field){
        _.each(slots, function(slot){

          //check for a game.

          events.push(
            {timeSlot: slot, startTime: formatTime(slot), fieldId: field._id, fieldName: field.description, team: 'Open', open: true}
          )

          // check for a fulfilled request

          // if not... then it's open

        })
      })

      $scope.days[day.value].events = _.sortBy(events, function(e){return e.timeSlot});
    })
  }



});

