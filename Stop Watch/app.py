from flask import Flask, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def serve_welcome():
    return send_from_directory('.', 'welcome.html')

@app.route('/app')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

if __name__ == '__main__':
    app.run(debug=True, port=5000) 