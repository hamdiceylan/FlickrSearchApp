describe('Testing Flickr Angular App',function () {
	
    beforeEach(module("flickrApp"));

    describe('Testing controllers',function () {
    var scope, ctrl;

    beforeEach(inject(function($controller,$rootScope,$httpBackend){
         scope = $rootScope.$new();  
         ctrl = $controller('MainCtrl', {$scope:scope}); 
         httpBackend = $httpBackend;
         rootScope =$rootScope;
      }));

      it('should loading work properly' ,function(){
          expect(scope.loading).toBeDefined();      
          expect(scope.loading).toBe(false);
      });

      it('should get request work' , function () {
        var searchField = "London";
          httpBackend.whenJSONP("http://www.flickr.com/services/feeds/photos_public.gne?tags="+searchField+"&format=json&jsoncallback=JSON_CALLBACK").respond({
              items : [{
                "title": "Snapshot",
                "link": "http://www.flickr.com/photos/hensontsai/24801076185/",
                "media": {"m":"http://farm2.staticflickr.com/1663/24801076185_660fccce57_m.jpg"},
                "date_taken": "2016-02-02T13:56:15-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/hensontsai/\">Henson.Tsai<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/hensontsai/24801076185/\" title=\"Snapshot\"><img src=\"http://farm2.staticflickr.com/1663/24801076185_660fccce57_m.jpg\" width=\"240\" height=\"147\" alt=\"Snapshot\" /><\/a><\/p> ",
                "published": "2016-02-03T22:17:01Z",
                "author": "nobody@flickr.com (Henson.Tsai)",
                "author_id": "139308246@N05",
                "tags": "boy sun cute london love smile kids warm sony streetphotography 55mm a7 snapchot"
                },
                {
                "title": "Snapshot",
                "link": "http://www.flickr.com/photos/hensontsai/24801076185/",
                "media": {"m":"http://farm2.staticflickr.com/1663/24801076185_660fccce57_m.jpg"},
                "date_taken": "2016-02-02T13:56:15-08:00",
                "description": " <p><a href=\"http://www.flickr.com/people/hensontsai/\">Henson.Tsai<\/a> posted a photo:<\/p> <p><a href=\"http://www.flickr.com/photos/hensontsai/24801076185/\" title=\"Snapshot\"><img src=\"http://farm2.staticflickr.com/1663/24801076185_660fccce57_m.jpg\" width=\"240\" height=\"147\" alt=\"Snapshot\" /><\/a><\/p> ",
                "published": "2016-02-03T22:17:01Z",
                "author": "nobody@flickr.com (Henson.Tsai)",
                "author_id": "139308246@N05",
                "tags": "boy sun cute london love smile kids warm sony streetphotography 55mm a7 snapchot"
                }]
          });
          scope.getData("London");
          httpBackend.flush();
          expect(scope.images.length).toBe(2);
          expect(scope.images[0].title).toBe("Snapshot");
          expect(scope.loading).toBe(false);

      });

      it('should get request error work' , function () {
        var searchField = "London";
          httpBackend.whenJSONP("http://www.flickr.com/services/feeds/photos_public.gne?tags="+searchField+"&format=json&jsoncallback=JSON_CALLBACK").respond(500);
          scope.getData("London");
          httpBackend.flush();
          expect(scope.images).toBe("Request failed");
          expect(scope.loading).toBe(false);
      });

    });

});