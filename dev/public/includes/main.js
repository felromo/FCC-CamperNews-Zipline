var camperNewsApp = angular.module('newsApp', [])

.factory('newsFactory', function () {
  var news = {};
  return news;
})

.controller('newsController',['newsFactory', function (newsFactory) {

}]);
