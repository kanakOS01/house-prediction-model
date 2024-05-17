from flask import Flask, request, jsonify, render_template, send_from_directory
import util

app = Flask(__name__)

@app.route('/home')
def home():
    # return render_template('client/app.html')
    return send_from_directory('../client', 'app.html')

@app.route('/get_loc_names')
def get_loc_names():
    response = jsonify({
        'locations': util.get_loc_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_prediction', methods=['POST'])
def get_prediction():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = request.form['bhk']
    bath = request.form['bath']

    response = jsonify({
        'price': util.get_prediction(location, total_sqft, bhk, bath)
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    print(response)
    return response

if __name__ == '__main__':
    print("Starting python flask server for home price prediction")
    util.load_artifacts()
    app.run(debug=True)