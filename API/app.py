import json

from bson.json_util import dumps, loads
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS

from db import DBConnection
from analysis.vision import VisionAPI

app = Flask(__name__)
CORS(app)

db = DBConnection()


@app.route('/posts')
def get_posts():
    posts = db.get_posts(request)
    return dumps(posts)


@app.route('/tags')
def get_tags():
    return jsonify(
        [
            'marfil, rino', 'unicornio'
        ]

    )


@app.route('/users')
def get_users():
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
def delete_post(id):
    return 'Hola  se ha borrado el anuncio con id ' + id

@app.route('/images', methods=['GET'])
def get_images():
    images = db.get_images()
    images = [image['images'] for image in images]
    print(images)
    labels = VisionAPI().get_image_labels(images)
    return dumps(labels)


@app.route('/posts', methods=['POST'])
def insert_post():
    posts = loads(request.data)
    post = [{
        "title": params['title'],
        "description": params['description'],
        "date": params['date'],
        "location": [params['location'][0], params['location'][1]],
        "images": [params['title'], params['title']],
        "user": {
            "_id": abs(hash(params['user']['name'])) % (10 ** 8),
            "name": params['title'],
            "email": params['title'],
            "extra": []
        },
        "categories": [1, params['title']],
        "price": 1,
        "url": 1
    } for params in posts]
    db.insert_posts(post)
    return "", 201


if __name__ == '__main__':
    app.run()
