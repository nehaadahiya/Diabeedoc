import pandas as pd 
from sklearn.ensemble import RandomForestClassifier 
from sklearn.model_selection import train_test_split 
from sklearn.metrics import accuracy_score 
import joblib 

# Load the dataset
data = pd.read_csv('./dataset/food_data.csv')

# Define features (X) and target (y)
X = data[['carbs', 'protein', 'fat', 'fiber', 'calories', 'glycemic_index']]
y = data['glycemic_index'].apply(lambda gi: 1 if gi < 55 else 0)  # 1 = Recommended, 0 = Not Recommended

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Model Accuracy: {accuracy:.2f}")

# Save the trained model to a file
joblib.dump(model, './model/random_forest_model.pkl')
