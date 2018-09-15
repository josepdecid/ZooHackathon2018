import json

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
                'Title': 'vendo cocodrilo',
                'Description': 'vendo cocodrilo',
                'Date:"10/09/2010'
                'Location': json.dumps({'Latitude': 41.3884966, 'Longitude': 41.3884966}),
                'Images': 'img',
                'User': json.dumps(
                    {'name': 'gonredo', 'email': 'gonredo@cazador.es', 'extra': json.dumps(['extra1','extra2'])}),
                'Categories': json.dumps(['tigre', 'unicornio']),
                'Price': 9.300,
                'URL': 'url'
            },
            {
                'id': 322,
                'Title': 'vendo cocodrilo',
                'Description': 'vendo cocodrilo',
                'Date:"10/09/2010'
                'Location': json.dumps({'Latitude': 41.3884966, 'Longitude': 41.3884966}),
                'Images': 'img',
                'User': json.dumps(
                    {'name': 'juanjo', 'email': 'juanjo@cazador.es', 'extra': json.dumps(['extra1','extra2'])}),
                'Categories': json.dumps(['tigre']),
                'Price': 9.300,
                'URL': 'url'
            }

        ]

    )


@app.route('/tags')
def get_tags():
    return jsonify(
        [
            'marfil, rino', 'unicornio'

        ]

    )


@app.route('/users')
def get_users():

    user1 = {
        'pepe': 'papo'
    }

    return jsonify(
        [
            {
                'name': 'gonredo',
                'email': 'gonredo@cazador.es',
                'extra': json.dumps('extra2')},
            {
                'name': 'juanjo',
                'email': 'juanjo@cazador.es',
                'extra': json.dumps('extra1')}

        ]

    )


@app.route('/posts/<id>', methods=['DELETE'])
def delete(id):
    return 'Hola  se ha borrado el anuncio con id ' + id


if __name__ == '__main__':
    app.run()
