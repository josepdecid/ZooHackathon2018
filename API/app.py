from flask import Flask, request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/posts')
def get_posts():
    return 'Title:'

@app.route('/delete',methods=['POST'])
def delete():
    id = request.form['id']
    return 'Hola  se ha borrado el anuncio con id' + id

if __name__ == '__main__':
    app.run()
