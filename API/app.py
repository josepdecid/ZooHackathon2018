from flask import Flask, request

from flask_cors import CORS

from API.crawling.main import start_crawler
from API.db import DBConnection

app = Flask(__name__)
CORS(app)

db = DBConnection()


@app.route('/posts', methods=['GET'])
def get_posts():
    return db.get_posts(request)


@app.route('/posts/<id>', methods=['DELETE'])
def delete(id):
    return 'Hola  se ha borrado el anuncio con id ' + id


if __name__ == '__main__':
    start_crawler()
    app.run()
