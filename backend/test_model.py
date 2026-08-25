import joblib

print("Loading model...")

model = joblib.load("employee_attrition_model.pkl")

print("Model loaded successfully!")
print(type(model))

threshold = joblib.load("attrition_threshold.pkl")

print("Threshold:", threshold)