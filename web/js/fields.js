'use strict';

/* Controllers */

var fieldApp = angular.module('fieldApp', []);

fieldApp.controller('FieldController', function($scope, $http) {

  $scope.loadFields = function() {
    $http.get('/api/fields')
      .success(function(data, err){
        $scope.fields = data;
      });
  }

  $scope.loadFields();

  $scope.edit = function(id){
    $scope.selectedFieldAction = 'Update Field Info';
    var f = _.find($scope.fields, function(f) {return f._id == id;});

    $scope.selectedField = {
      _id: f._id,
      code: f.code,
      description: f.description
    };
  }

  $scope.newField = function() {
    $scope.selectedFieldAction = 'Create New Field';
    $scope.selectedField = {_id: null, code: '', description: ''};
  }

  $scope.cancelEdit = function() {
    $scope.selectedField = null;
  }

  $scope.updateField = function() {
    $http.post('/api/field', {field: $scope.selectedField})
      .success(function(data){
        $scope.loadFields();
        $scope.selectedField = null;
      })
  }

  $scope.genderValues = ['boys', 'girls'];

});