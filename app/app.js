'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.events',
  'myApp.race',
  'myApp.version',
  'angularMoment'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/events'});
}]).
constant({
  settings : {
    subdomain : "endurokings"
  }
});
