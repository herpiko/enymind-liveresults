'use strict';

angular.module('myApp.race', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/race/:cid', {
    templateUrl: 'race/race.html',
    cache : false,
    controller: 'RaceCtrl'
  });
}])

.controller('RaceCtrl', ["$rootScope", "$scope", "$http", "$routeParams", "settings", "$interval", function($rootScope, $scope, $http, $routeParams, settings, $interval) {
  var fetch = function(){
    $scope.spinner = true;
    
    $http({
      url :"http://" + settings.subdomain + ".live.enymind.com/live/api.php?rounds&cid=" + $routeParams.cid,
      method : "GET",
    })
      .success(function(data, status, headers){
        console.log(data);
        $rootScope.selectedRace = $routeParams.cid;
        $rootScope.selectedRound = data[0][0];
        $http({
          url :"http://endurokings.live.enymind.com/live/api.php?results&cid=" + $rootScope.selectedRace + "&rid=" + $rootScope.selectedRound,
          method : "GET",
        })
          .success(function(data, status, headers){
            console.log(data);
            $scope.finish = (data[2] === "Finish" || false);
            $scope.results = data[4];
            $scope.spinner = false;
          })
          .error(function(data, status, headers){
            $scope.spinner = false;
            $scope.failed = true;
          })
      })
      .error(function(data, status, headers){
        $scope.spinner = false;
        $scope.failed = true;
      })
  }

  fetch();

  $interval(function(){
    fetch();
  }, 30000);



}]);
