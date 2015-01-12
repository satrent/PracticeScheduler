'use strict';

var practiceApp = angular.module('practiceApp');

practiceApp.controller('RequestController', function($scope, $http) {


  var teams = [];
  var fields = [];
  $scope.requests = [];

  var teamPromise = $http.get('/api/teams')
    .success(function(data){
      teams = data;
    });

  var fieldPromise = $http.get('/api/fields')
    .success(function(data){
      fields = data;
    })

  teamPromise.then(function(){
    fieldPromise.then(function(){
      loadRequests();
    })
  })

  var loadRequests = function(){
    $http.get('/api/requests')
      .success(function(data){

        _.each(data, function(d){
          var team = _.find(teams, function(t){return t._id == d.teamId});
          var field = _.find(fields, function(f){return f._id == d.fieldId});

          $scope.requests.push({
            id: d._id,
            teamId: d.teamId,
            fieldId: d.fieldId,
            startTime: practice.utils.formatTime(d.startTime),
            date: d.date,
            fulfilled: d.fulfilled,
            teamName: team.coach + ' ' + team.level + ' ' + team.gender,
            fieldName: field.description
          })
        })
      })
  }


})

