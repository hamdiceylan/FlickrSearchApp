var flickrApp = angular.module('flickrApp',[]);



flickrApp.controller("MainCtrl", function ($scope, $http) {
    $scope.loading = false;
    $scope.testMessage = "This is a test dtestMessage";
    $scope.getData = function (searchField) {
      $scope.loading = true;
      $http.jsonp("http://www.flickr.com/services/feeds/photos_public.gne?tags="+searchField+"&format=json&jsoncallback=JSON_CALLBACK").
        success(function (data) {
          $scope.images = data.items;
          $scope.loading = false;
        }).
        error(function (data) {
          $scope.images = "Request failed";
          $scope.loading = false;
        });
    }
});