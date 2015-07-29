var updateInterval = 30;
'use strict';

angular.module('myApp.events', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/events', {
    templateUrl: 'events/events.html',
    controller: 'EventsCtrl'
  });
}])

.controller('EventsCtrl', ["$rootScope", "$scope", "$http", "$location", "settings",  function($rootScope, $scope, $http, $location, settings) {
  $scope.fetch = function(){
    $scope.spinner = true;
    $scope.failed = false;
    $http({
      url :"http://" + settings.subdomain + ".live.enymind.com/live/api.php?races&ajax=1",
      method : "GET",
    })
      .success(function(data, status, headers){
        console.log("success");
        /* console.log(data); */
        $rootScope.races = data.reverse();
        angular.forEach($rootScope.races, function(value, key) {
          console.log(value);
          value[2] = moment(value[2]);
          console.log(key);
        })
        $scope.spinner = false;
      })
      .error(function(data, status, headers){
        console.log("failed");
        $scope.spinner = false;
        $scope.failed = true;
      })
  }
  
  $scope.fetch();
  // get date

  $rootScope.detail = function(race) {
    $rootScope.selectedRaceTitle = race[1];
    $rootScope.selectedRaceDate = race[2];
    $location.url("/race/" + race[0]);
  }
}]);
