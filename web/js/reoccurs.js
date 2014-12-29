'use strict';

/* Controllers */

var practiceApp = angular.module('practiceApp');

practiceApp.controller('ReoccurController', function($scope, $http) {

  $scope.loadReoccurs = function() {
    $http.get('/api/reoccurs')
      .success(function(data){
        for(var i=0; i<data.reoccurs.length; i++){
          var team = _.find(data.teams, function(t){return t._id == data.reoccurs[i].teamId});
          var field = _.find(data.fields, function(f){return f._id == data.reoccurs[i].fieldId});
          var dayOption = _.find($scope.dayOptions, function(o){return o.value == data.reoccurs[i].dayOfWeek});

          data.reoccurs[i].teamName = team.coach;
          data.reoccurs[i].fieldName = field.description;
          data.reoccurs[i].dayOfWeekName = dayOption.name;
        }

        $scope.reoccurs = data.reoccurs;
      });
  }

  $scope.loadReoccurs();

  $scope.edit = function(id){
    $scope.selectedReoccurAction = 'Update Reoccuring Schedule';
    var r = _.find($scope.reoccurs, function(r) {return r._id == id;});

    $scope.selectedReoccur = {
      _id: r._id,
      teamId: r.teamId,
      dayOfWeek: r.dayOfWeek,
      fieldId: r.fieldId,
      startTime: r.startTime || -1,
      endTime: r.endTime || -1
    };
  }

  $scope.teamOptions = [];

  $http.get('/api/teams')
    .success(function(data){
      $scope.teamOptions = _.map(data, function(d){return {name: d.level + ' ' + d.coach,  value:d._id}})
    })

  $scope.fieldOptions = [];

  $http.get('/api/fields')
    .success(function(data){
      $scope.fieldOptions = _.map(data, function(d){return {name: d.code + ' ' + d.description, value: d._id}})
    })

  $scope.dayOptions = [
    {name: ' -- ', value: -1},
    {name: 'Monday', value: 0},
    {name: 'Tuesday', value: 1},
    {name: 'Wednesday', value: 2},
    {name: 'Thursday', value: 3},
    {name: 'Friday', value: 4},
    {name: 'Saturday', value: 5},
    {name: 'Sunday', value: 6}
  ];

  $scope.timeOptions = [
    {name: ' -- ', value: -1},
    {name: '6:00pm', value: 1800},
    {name: '6:30pm', value: 1830},
    {name: '7:00pm', value: 1900},
    {name: '7:30pm', value: 1930},
    {name: '8:00pm', value: 2000},
    {name: '8:30pm', value: 2030},
    {name: '9:00pm', value: 2100},
    {name: '9:30pm', value: 2130}
  ]

  $scope.newReoccur = function() {
    $scope.selectedReoccurAction = 'Create New Reoccurring Schedule';
    $scope.selectedReoccur = {coachId: -1, dayOfWeek: -1, fieldId: -1, startTime: -1, endTime: -1};
  }

  $scope.cancelEdit = function() {
    $scope.selectedReoccur = null;
  }

  $scope.updateReoccur = function() {
    $http.post('/api/reoccur', {reoccur: $scope.selectedReoccur})
      .success(function(data){
        $scope.loadReoccurs();
        $scope.selectedReoccur = null;
      })
  }

  $scope.genderValues = ['boys', 'girls'];

});