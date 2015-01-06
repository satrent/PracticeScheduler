'use strict';

var practiceApp = angular.module('practiceApp');

practiceApp.controller('RequestController', function($scope, $http) {

  $scope.newRequest = function(){
    $scope.selectedRequest = {};
  }

})

