'use strict';

/* Controllers */

var teamApp = angular.module('teamApp', []);

teamApp.controller('TeamController', function($scope, $http) {

  $scope.loadTeams = function() {
    $http.get('/api/teams')
      .success(function(data){
        $scope.teams = data;
      });
  }

  $scope.loadTeams();

  $scope.edit = function(id){
    $scope.selectedTeamAction = 'Update Team Info';
    var t = _.find($scope.teams, function(t) {return t._id == id;});

    $scope.selectedTeam = {
      _id: t._id,
      coach: t.coach,
      level: t.level,
      gender: t.gender
    };
  }

  $scope.newTeam = function() {
    $scope.selectedTeamAction = 'Create New Team';
    $scope.selectedTeam = {_id: null, coach: '', level: '', gender: ''};
  }

  $scope.cancelEdit = function() {
    $scope.selectedTeam = null;
  }

  $scope.updateTeam = function() {
    $http.post('/api/team', {team: $scope.selectedTeam})
      .success(function(data){
        console.log(data);
          $scope.loadTeams();
        $scope.selectedTeam = null;
      })
  }

  $scope.genderValues = ['boys', 'girls'];

});