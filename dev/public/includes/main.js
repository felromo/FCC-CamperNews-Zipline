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
      var images_rough = reply.data;
      var all_images = [];

      images_rough.forEach(function (value) {
        if (value.image.length === 0) {
          all_images.push(value.author.picture);
        } else if (value.image == "undefined") {
          all_images.push(value.author.picture);
        } else {
          all_images.push(value.image);
        }
      });

      $scope.pics = all_images;

    });
  };

  self.init();

}]);
