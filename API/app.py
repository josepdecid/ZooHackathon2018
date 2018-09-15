from flask import Flask, jsonify

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/posts')
def get_posts():
    return jsonify(
        [
            {
                'id': 321,
                'title': 'vendo cocodrilo',
                'address': 'Inlab B5',
                'latitude': 41.3884966,
                'longitude': 41.3884966,
                'tags': ['marfil', 'tigre', 'cocodrilo']
            },
            {
                'id': 322,
                'title': 'vendo unicornio',
                'address': 'Inlab B5',
                'latitude': 41.3884966,
                'longitude': 2.33884966,
                'tags': ['raro', 'especial', 'salvaje']
            }
        ]

    )


@app.route('/posts/<id>', methods=['DELETE'])
def delete(id):
    return 'Hola  se ha borrado el anuncio con id ' + id


if __name__ == '__main__':
    app.run()
