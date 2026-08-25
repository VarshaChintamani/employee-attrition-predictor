import joblib
import pandas as pd


model = joblib.load("employee_attrition_model.pkl")
threshold = joblib.load("attrition_threshold.pkl")


def get_risk_factors(employee_data: dict):

    factors = []

    if employee_data["OverTime"] == "Yes":
        factors.append("Working overtime")

    if employee_data["BusinessTravel"] == "Travel_Frequently":
        factors.append("Frequent business travel")

    if employee_data["JobRole"] in [
        "Laboratory Technician",
        "Sales Representative",
        "Human Resources"
    ]:
        factors.append(
            f"Job role: {employee_data['JobRole']}"
        )

    if employee_data["MaritalStatus"] == "Single":
        factors.append("Single marital status")

    if employee_data["DistanceFromHome"] >= 10:
        factors.append("Long distance from home")

    if employee_data["NumCompaniesWorked"] >= 3:
        factors.append("Multiple previous companies")

    if employee_data["YearsSinceLastPromotion"] >= 3:
        factors.append("Long time since last promotion")

    return factors


def predict_employee(employee_data: dict):

    employee_df = pd.DataFrame([employee_data])

    probability = model.predict_proba(employee_df)[0][1]

    prediction = probability >= threshold

    risk_factors = get_risk_factors(employee_data)

    return {
        "attrition_probability": round(float(probability), 4),
        "attrition_percentage": round(float(probability) * 100, 2),
        "prediction": int(prediction),
        "risk_level": "High" if prediction else "Low",
        "risk_factors": risk_factors
    }