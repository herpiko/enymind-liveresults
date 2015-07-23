'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ["$rootScope", "$scope", "$http", function($rootScope, $scope, $http) {
  $http({
    url :"http://endurokings.live.enymind.com/live/api.php?results&cid=" + $rootScope.selectedRace + "&rid=" + $rootScope.selectedRound,
    method : "GET",
  })
    .success(function(data, status, headers){
      console.log(data);
      $scope.results = data[4];
    })

}]);
