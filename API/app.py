from bson.json_util import dumps, loads
from flask import Flask, request
from flask_cors import CORS

from analysis.vision import VisionAPI
from db import DBConnection

app = Flask(__name__)
CORS(app)

db = DBConnection()


@app.route('/posts')
def get_posts():
    posts = db.get_posts(request.args.get('tags', []))
    return dumps(posts)


@app.route('/users')
def get_users():
    users = db.get_users()
    return dumps(users)


@app.route('/posts/<post_id>', methods=['DELETE'])
def delete_post(post_id):
    db.delete_post(post_id)
    return "", 201


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
        'title': params['title'],
        'description': params['description'],
        'date': params['date'],
        'location': [params['location'][0], params['location'][1]],
        'images': params['images'],
        'tags': params['tags'],
        'price': params['price'],
        'url': params['url'],
        'user': {
            "_id": abs(hash(params['user']['name'])) % (10 ** 8),
            "name": params['user']['name'],
            'url': params['user']['url']
        }
    } for params in posts]
    db.insert_posts(post)
    return "", 201


if __name__ == '__main__':
    app.run()
