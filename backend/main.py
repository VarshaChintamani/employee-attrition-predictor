from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import EmployeeData
from prediction import predict_employee


app = FastAPI(
    title="Employee Attrition Predictor API",
    description="API for predicting employee attrition risk",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return {
        "message": "Employee Attrition Predictor API is running"
    }


@app.post("/predict")
def predict_attrition(employee: EmployeeData):

    employee_data = employee.model_dump()

    return predict_employee(employee_data)