'use strict';

var practiceApp = angular.module('practiceApp');

practiceApp.controller('CalendarController', function($scope, $http) {

  $scope.loadWeeks = function() {
    $http.get('/api/weeks')
      .success(function(data){
        $scope.weeks = data;
      });
  }

  $scope.loadWeeks();

  $scope.selectedWeekAction = '';

  $scope.newWeek = function() {
    $scope.selectedWeekAction = 'Create New Week';
    $scope.selectedWeek = {_id: null, startDate: null, status: 'future'};
  }

  $scope.updateWeek = function() {
    $http.post('/api/week', {week: $scope.selectedWeek})
      .success(function(data){
        $scope.updateMessage = '';
        if (data && data.errors){
          _.each(data.errors, function(error){
            $scope.updateMessage += error + ' ';
          })
        } else {
          $scope.selectedWeek = null;
          $scope.loadWeeks();
        }
      })
  }

  $scope.openWeek = function(w){
    w.status = 'open';
    $http.post('/api/week', {week: w})
      .success(function(data){
        $scope.updateMessage = '';
        if (data && data.errors){
          _.each(data.errors, function(error){
            $scope.updateMessage += error + ' ';
          })
        } else {
          $scope.selectedWeek = null;
          $scope.loadWeeks();
        }
      })
  }

  $scope.closeWeek = function(w){

  }

  $scope.cancelEdit = function() {
    $scope.selectedWeek = null;
  }
})


