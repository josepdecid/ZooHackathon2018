from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/posts')
def get_posts():
    return jsonify(
        id='321',
        title='vendo cocodrilo',
        adress='Inlab B5',
        latitude='41.3884966',
        longitude='41.3884966',
        tags=['marfil','tigre','cocodrilo']
    )

@app.route('/posts/<id>', methods=['DELETE'])
def delete(id):
    return 'Hola  se ha borrado el anuncio con id ' + id


if __name__ == '__main__':
    app.run()
