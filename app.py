from flask import Flask, render_template, request,Response
from flask import render_template
from flask_cors import CORS, cross_origin

app = Flask(__name__)

@app.route('/')
@app.route('/dsa_ui')
def dsawebixjs_page():
    return render_template('index.html', tile='Home')

@app.route('/color_kmeans', methods=['GET','POST'])
def color_kmeans():
	if request.method == 'GET':
		slide_id = request.form['slideid'];		
		name = request.form['name'];		
		result=color_kmeans();
		return result	

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    response.headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
    return response

@app.errorhandler(500)
def page_not_found(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)