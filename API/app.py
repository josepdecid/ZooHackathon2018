import json
from multiprocessing import Process

from bson.json_util import dumps
from flask import Flask, request
from flask import jsonify
from flask_cors import CORS

from crawling.main import start_crawler
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
def delete(id):
    return 'Hola  se ha borrado el anuncio con id ' + id


if __name__ == '__main__':
    p = Process(target=start_crawler)
    p.start()
    p.join()

    app.run()
