from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/posts')
def get_posts():
    return jsonify(
        id='321',
        title='vendo cocodrilo',
        adress='Inlab B5',
        latitude='41.3884966',
        longitude='41.3884966'
    )

@app.route('/posts/<id>', methods=['DELETE'])
def delete(id):
    return 'Hola  se ha borrado el anuncio con id ' + id


if __name__ == '__main__':
    app.run()
