'use strict';

/* Controllers */

var reoccurApp = angular.module('reoccurApp', []);

reoccurApp.controller('ReoccurController', function($scope, $http) {

  $scope.loadReoccurs = function() {
    $http.get('/api/reoccurs')
      .success(function(data){
        $scope.reoccurs = data;
      });
  }

  $scope.loadReoccurs();

  $scope.edit = function(id){
    $scope.selectedReoccurAction = 'Update Reoccuring Schedule';
    var t = _.find($scope.reoccurs, function(t) {return t._id == id;});

    $scope.selectedReoccur = {
      _id: t._id,
      coach: t.coach,
      level: t.level,
      gender: t.gender
    };
  }

  $scope.newReoccur = function() {
    $scope.selectedReoccurAction = 'Create New Reoccuring Schedule';
    $scope.selectedReoccur = {coachId: -1, dayOfWeek: -1, fieldId: -1};
  }

  $scope.cancelEdit = function() {
    $scope.selectedReoccur = null;
  }

  $scope.updateReoccur = function() {
    $http.post('/api/reoccur', {reoccur: $scope.selectedReoccur})
      .success(function(data){
        console.log(data);
        $scope.loadReoccurs();
        $scope.selectedReoccur = null;
      })
  }

  $scope.genderValues = ['boys', 'girls'];

});