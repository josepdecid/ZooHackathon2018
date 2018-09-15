import json

from bson.json_util import dumps
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS

from db import DBConnection

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


@app.route('/posts', methods=['POST'])
def insert_post():
    json = request.data
    post = {
        "title": json['title'],
        "description": json['description'],
        "date": json['date'],
        "location": [json['location']['latitude'], json['location']['longitude']],
        "images": [json['title'], json['title']],
        "user": {
            "name": json['title'],
            "email": json['title'],
            "extra": []
        },
        "categories": [1, json['title']],
        "price": 1,
        "url": 1
    }
    db.insert_posts(post)
    return 201


if __name__ == '__main__':
    app.run()
