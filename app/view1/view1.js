'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ["$rootScope", "$scope", "$http", "$location",  function($rootScope, $scope, $http, $location) {
  $http({
    url :"http://endurokings.live.enymind.com/live/api.php?races",
    method : "GET",
  })
    .success(function(data, status, headers){
      console.log(data);
      $scope.races = data;
    })

  $scope.detail = function(race) {
    // get rounds
    $http({
      url :"http://endurokings.live.enymind.com/live/api.php?rounds&cid=" + race[0],
      method : "GET",
    })
      .success(function(data, status, headers){
        console.log(data);
        $rootScope.selectedRace = race[0];
        $rootScope.selectedRound = data[0][0];
        $location.url("/view2");
      })
  }
}]);
