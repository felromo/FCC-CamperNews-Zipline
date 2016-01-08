angular.module('newsApp', ['angularGrid'])

.service('imageService', ['$http', function ($http) {
  this.loadImages = function () {
    return $http.get('http://www.freecodecamp.com/news/hot');
  };
}])

.controller('newsController', ['imageService', 'angularGridInstance', function (imageService, angularGridInstance) {
  self = this;
  self.articles = [];

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
      // these will be the final articles already processed with the necessary information
      var processing_articles = [];

      // some images have either empty image strings or "undefined" strings
      rough_articles.forEach(function (value) {
        var image = null;
        if (value.image.length === 0) {
          image = value.author.picture;
        } else if (value.image == "undefined") {
          image = value.author.picture
        } else {
          image = value.image;
        }
        processing_articles.push({
          'image': image,
          'title': value.headline,
          'upvotes': value.rank,
          'link': value.link,
          'date': value.timePosted,
        });
      });

      self.articles = processing_articles;

    });
  };

  self.init();

}]);
