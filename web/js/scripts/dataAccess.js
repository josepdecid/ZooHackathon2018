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
          date: new Date('2018/09/08'),
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
          date: new Date('2018/09/10'),
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
          date: new Date('2018/09/11'),
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

  HuntedHaunters.DataAccess.GraphMock = function() {
    var _this = {};

    _this.setGraphData = function(graph) {
      addNodes(graph);
      addEdges(graph);
    };

    var addNodes = function(graph) {
      var color = '#f00';

      graph.addNode({
        id: 'n1',
        label: 'dani344',
        x: 0.15,
        y: 0.45,
        size: 3,
        color: color
      }).addNode({
        id: 'n2',
        label: 'x_cazador_x',
        x: 0.9,
        y: 0.05,
        size: 2,
        color: color
      }).addNode({
        id: 'n3',
        label: '0908_javi',
        x: 0.7,
        y: 0.4,
        size: 2,
        color: color
      }).addNode({
        id: 'n4',
        label: 'nicolas_cage',
        x: 0.55,
        y: 0.78,
        size: 2,
        color: color
      }).addNode({
        id: 'n5',
        label: 'rhinobrother99',
        x: 0.6,
        y: 0.3,
        size: 3,
        color: color
      }).addNode({
        id: 'n6',
        label: 'the_killer',
        x: 0.02,
        y: 0.1,
        size: 1,
        color: color
      }).addNode({
        id: 'n7',
        label: 'Gistonic',
        x: 0.45,
        y: 0.66,
        size: 4,
        color: color
      }).addNode({
        id: 'n8',
        label: 'Sergio',
        x: 0.48,
        y: 0.9,
        size: 1,
        color: color
      });
    };

    var addEdges = function(graph) {
      graph.addEdge({
        id: 'e1',
        source: 'n1',
        target: 'n6'
      }).addEdge({
        id: 'e2',
        source: 'n1',
        target: 'n7'
      }).addEdge({
        id: 'e3',
        source: 'n1',
        target: 'n5'
      }).addEdge({
        id: 'e4',
        source: 'n3',
        target: 'n7'
      }).addEdge({
        id: 'e5',
        source: 'n4',
        target: 'n7'
      }).addEdge({
        id: 'e6',
        source: 'n5',
        target: 'n7'
      }).addEdge({
        id: 'e7',
        source: 'n4',
        target: 'n8'
      }).addEdge({
        id: 'e8',
        source: 'n2',
        target: 'n3'
      }).addEdge({
        id: 'e9',
        source: 'n2',
        target: 'n5'
      })
    };

    return _this;
  };
})();