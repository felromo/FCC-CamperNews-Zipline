angular.module('newsApp', ['angularGrid'])

.service('imageService', ['$http', function ($http) {
  this.loadImages = function () {
    return $http.get('http://www.freecodecamp.com/news/hot');
  };
}])

.controller('newsController', ['$scope', 'imageService', 'angularGridInstance', function ($scope, imageService, angularGridInstance) {
  self = this;

  self.imageValues = function (image) {
    image.addEventListener('onload', function () {
      console.log("width is: " + this.naturalWidth);
      console.log("height is: " + this.naturalHeight);
    });
  };

  self.refresh = function () {
    angularGridInstance.gallery.refresh();
  };

  self.init = function () {
    imageService.loadImages().then(function (reply) {
      var rough_articles = reply.data;
      var all_images = [];
      // these will be the final articles already processed with the necessary information
      var processing_articles = [];
      $scope.articles = [];

      // some images have either empty image strings or "undefined" strings
      rough_articles.forEach(function (value) {
        var image = null;
        if (value.image.length === 0) {
          all_images.push(value.author.picture);
          image = value.author.picture;
        } else if (value.image == "undefined") {
          all_images.push(value.author.picture);
          image = value.author.picture
        } else {
          all_images.push(value.image);
          image = value.image;
        }
        processing_articles.push({
          'image': image,
          'title': value.headline,
          'upvotes': value.rank,
        });
      });

      $scope.pics = all_images;
      $scope.articles = processing_articles;

    });
  };

  self.init();

}]);
