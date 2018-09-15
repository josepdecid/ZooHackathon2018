(function() {
  HuntedHaunters.DataAccess = {};

  HuntedHaunters.DataAccess.Posts = function() {
    var _this = {};

    _this.loadPosts = function(callback) {
      $.get( "http://localhost:5000/posts", function( data ) {
        callback(data);
      });
    }

    return _this;
  };

  HuntedHaunters.DataAccess.PostsMock = function() {
    var _this = {};

    _this.loadPosts = function(callback) {
      callback([
        {
          id: 1,
          title: 'vendo cocodrilos',
          address: 'InLab',
          latitude: 48.2,
          longitude: 2.13,
          tags: ['cocodrilo', 'salvaje']
        },
        {
          id: 2,
          title: 'vendo unicornio',
          address: 'InLab FIB',
          latitude: 49.1,
          longitude: 2.78,
          tags: ['especial', 'unicornio', 'salvaje']
        }
      ]);
    }

    return _this;
  };

  HuntedHaunters.DataAccess.Sellers = function() {
    var _this = {};

    return _this;
  };

  HuntedHaunters.DataAccess.SellersMock = function() {
    var _this = {};

    _this.loadSellers = function(callback) {
      callback([
        {
          id: 1,
          name: 'Gistonic',
          posts: [1, 2]
        },
        {
          id: 2,
          name: 'Sergio',
          posts: [3]
        }
      ]);
    };

    return _this;
  };
})();