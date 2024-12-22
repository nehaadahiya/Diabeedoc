from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Load the dataset
food_data = pd.read_csv('./dataset/food_data.csv')

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        data = request.json

        # Get the food name from user input
        food_name = data.get('food_name', '').lower()
        food_entry = food_data[food_data['food_name'].str.lower() == food_name]

        if not food_entry.empty:
            # Extract food details
            food_info = food_entry.iloc[0].to_dict()
            recommendation = "Recommended" if food_info['glycemic_index'] < 55 else "Not Recommended"

            return jsonify({
                'recommendation': recommendation,
                'glycemic_index': food_info['glycemic_index'],
                'calories': food_info['calories']
            })
        else:
            return jsonify({'error': 'Food item not found in the dataset.'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
