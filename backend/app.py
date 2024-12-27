from flask import Flask, send_from_directory, jsonify, request
import joblib
import pandas as pd
from flask_cors import CORS
import os #for accessing env variables

app = Flask(__name__)
CORS(app)

# Loading the trained Random Forest model
model = joblib.load('./model/random_forest_model.pkl')

# Load the dataset containing food details
food_data = pd.read_csv('./dataset/food_data.csv')

@app.route('/')
def index():
    return send_from_directory('../frontend', 'index.html')

# Serve other HTML and static files
@app.route('/<path:filename>')

def frontend_files(filename):
    return send_from_directory('../frontend', filename)

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        # Get food name from user input (case insensitive)
        food_name = request.json.get('food_name', '').lower()

        # Look for the food in the dataset
        food_entry = food_data[food_data['FoodName'].str.lower() == food_name]

        if not food_entry.empty:
            # Extract food details
            food_info = food_entry.iloc[0]  # Get the first match
            input_features = pd.DataFrame([{
                'carbs': food_info['carbs'],
                'protein': food_info['protein'],
                'fat': food_info['fat'],
                'fiber': food_info['fiber'],
                'calories': food_info['calories'],
                'glycemic_index': food_info['glycemic_index']
            }])
            
            # Predict using the trained model
            prediction = model.predict(input_features)[0]
            recommendation = "Recommended" if prediction == 1 else "Not Recommended"

            # Return the response
            return jsonify({
                'food_name': food_info['FoodName'],
                'recommendation': recommendation,
                'glycemic_index': food_info['glycemic_index'],
                'calories': food_info['calories']
            })
        else:
            return jsonify({'error': 'Food item not found in the dataset.'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    # app.run(debug=True)
    #bind to 0.0.0.0 and use the port env variable for deployment
    port = int(os.environ.get('PORT', 5000))
    app.run(host="0.0.0.0", port=port)
