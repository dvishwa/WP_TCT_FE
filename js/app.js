'use strict';

/* App Module */
var curationViewerApp = angular.module('curationViewerApp', [
  'ngRoute',
  'curationViewerControllers'
]);

curationViewerApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/main.html',
        controller: 'MainCtrl'
      })
      .when('/resolution/:resolution', { //
       templateUrl: 'partials/main.html',
       controller: 'MainCtrl'
      });
      //.otherwise({redirectTo:'/'});
}]);