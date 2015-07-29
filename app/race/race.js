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
      url :"http://" + settings.subdomain + ".live.enymind.com/live/api.php?cid=" + $routeParams.cid +"&ajax=1",
      method : "GET",
    })
      .success(function(data, status, headers){
        console.log(data);
        console.log(data);
        $scope.finish = (data[2] === "Finish" || false);
        $scope.results = data[4];
        for (var i = 0; i < $scope.results.length;i++) {
          $scope.results[i][10] = i + 1;
          if ($scope.results[i][8].substr(-1,1) == "!") {
            $scope.results[i][8] = $scope.results[i][8].slice(0,-1);
            $scope.results[i][12] = true;
          }
        }
        $scope.spinner = false;
      })
      .error(function(data, status, headers){
        $scope.spinner = false;
        $scope.failed = true;
      })
  }

  fetch();
  
  $scope.hideRacerDetail = function(){
    var detail = angular.element( document.querySelector( '#racerDetail' ));
    detail.html("");  
    $scope.racerDetail = false;
  }
  $scope.fetchRacerDetail = function(id){
    $scope.spinner = true;
    plotdata = [];
    $http({
      url :"http://" + settings.subdomain + ".live.enymind.com/live/ajax.php?cid=" + $routeParams.cid +"&lid=" + id + "&currlaps",
      method : "GET",
    })
    .success(function(data, status, headers){
      $scope.spinner = false;
      console.log(data);
      var p = JSON.parse("{" +  data.split("{")[1].split("}")[0].replace("data","\"data\"").replace("label","\"label\"").replace("],]","]]").replace(" ","").replace("'","\"").replace("'","\"") + "}");
      plotdata.push(p);
    })
    .error(function(data, status, headers){
      $scope.spinner = false;
      $scope.failed = true;
    })
    $http({
      url :"http://" + settings.subdomain + ".live.enymind.com/live/ajax.php?cid=" + $routeParams.cid +"&lid=" + id,
      method : "GET",
    })
    .success(function(data, status, headers){
      $scope.racerDetail = true;
      $scope.spinner = false;
      var detail = angular.element( document.querySelector( '#racerDetail' ) );
      detail.html(data.replace("ajax.php","http://" + settings.subdomain + ".live.enymind.com/live/ajax.php").replace("float: left;",""));  
      $.plot($('#plot'), plotdata, {
        yaxis: {
          mode: "time"
        },
        xaxis: {
          min: 1,
          max: 12,
          tickSize: 1,
          tickFormatter: function (val, axis) { return val.toFixed(0); }
        },
        points: {
          show: true,
          fill: true
        },
        legend: {
          position: "se"
        },
        lines: {
          show: true,
          fill: false,
          fillColor: "rgba(255, 255, 255, 0.8)"
        },
        colors: ['black','red','orange','green','blue','purple']
      } )

    })
    .error(function(data, status, headers){
      $scope.spinner = false;
      $scope.failed = true;
    })
  }

  $interval(function(){
    fetch();
  }, 30000);



}]);
