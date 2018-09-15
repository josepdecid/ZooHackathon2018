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
          title: 'Vendo Cocodrilo del Nilo',
          description: '<p>Vendiendo cocodrilos todos los dias a todas horas</p>',
          images: [
            'https://cloud10.todocoleccion.online/arte-etnico/tc/2016/02/14/14/54444149.jpg',
            'https://cloud10.todocoleccion.online/arte-etnico/tc/2016/02/14/14/54444149.jpg'
          ],
          location: {
            latitude: 48.2,
            longitude: 2.13
          },
          tags: ['africa', 'cocodrilo', 'salvaje', 'egipto'],
          price: 6880,
          url: 'https://www.youtube.com/',
          user: {
            id: 1,
            name: 'Gisela Ruzafa'
          }
        },
        {
          id: 2,
          title: 'Tigre del Amazonas a buen precio',
          description: '<p>Tigre con garras de leon, grandes cuernos y orejas de gato.</p><p>Abstenerse graciosos</p>',
          images: [
            'https://cloud10.todocoleccion.online/arte-etnico/tc/2016/02/14/14/54444149.jpg',
            'https://cloud10.todocoleccion.online/arte-etnico/tc/2016/02/14/14/54444149.jpg'
          ],
          location: {
            latitude: 43.2,
            longitude: 2.77
          },
          tags: ['tigre', 'amazonas', 'salvaje'],
          price: 15677,
          url: 'https://www.facebook.com/',
          user: {
            id: 1,
            name: 'Gisela Ruzafa'
          }
        },
        {
          id: 3,
          title: 'Bol de cuerno de rinoceronte',
          description: '<p>Bol artesanal hecho con cuerno autentico de rinoceronte. Con ornamentaciones al estilo Gaudi.</p><p>Precio negociable.</p>',
          images: [
            'https://cloud10.todocoleccion.online/arte-etnico/tc/2016/02/14/14/54444149.jpg',
            'https://cloud10.todocoleccion.online/arte-etnico/tc/2016/02/14/14/54444149.jpg'
          ],
          location: {
            latitude: 12.67,
            longitude: 12.56
          },
          tags: ['rinoceronte', 'decoracion', 'pieza'],
          price: 345,
          url: 'https://www.google.com',
          user: {
            id: 2,
            name: 'Sergio'
          }
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