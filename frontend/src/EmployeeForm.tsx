import { useState } from "react";

interface EmployeeData {
  Age: number;
  BusinessTravel: string;
  DailyRate: number;
  Department: string;
  DistanceFromHome: number;
  Education: number;
  EducationField: string;
  EnvironmentSatisfaction: number;
  Gender: string;
  HourlyRate: number;
  JobInvolvement: number;
  JobLevel: number;
  JobRole: string;
  JobSatisfaction: number;
  MaritalStatus: string;
  MonthlyIncome: number;
  MonthlyRate: number;
  NumCompaniesWorked: number;
  OverTime: string;
  PercentSalaryHike: number;
  PerformanceRating: number;
  RelationshipSatisfaction: number;
  StockOptionLevel: number;
  TotalWorkingYears: number;
  TrainingTimesLastYear: number;
  WorkLifeBalance: number;
  YearsAtCompany: number;
  YearsInCurrentRole: number;
  YearsSinceLastPromotion: number;
  YearsWithCurrManager: number;
}

function EmployeeForm() {
  const [employee, setEmployee] = useState<EmployeeData>({
    Age: 30,
    BusinessTravel: "Travel_Rarely",
    DailyRate: 800,
    Department: "Sales",
    DistanceFromHome: 10,
    Education: 3,
    EducationField: "Life Sciences",
    EnvironmentSatisfaction: 3,
    Gender: "Female",
    HourlyRate: 60,
    JobInvolvement: 3,
    JobLevel: 2,
    JobRole: "Sales Executive",
    JobSatisfaction: 3,
    MaritalStatus: "Single",
    MonthlyIncome: 5000,
    MonthlyRate: 15000,
    NumCompaniesWorked: 2,
    OverTime: "Yes",
    PercentSalaryHike: 15,
    PerformanceRating: 3,
    RelationshipSatisfaction: 3,
    StockOptionLevel: 0,
    TotalWorkingYears: 5,
    TrainingTimesLastYear: 3,
    WorkLifeBalance: 3,
    YearsAtCompany: 2,
    YearsInCurrentRole: 1,
    YearsSinceLastPromotion: 1,
    YearsWithCurrManager: 1,
  });

  const handleNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setEmployee((previous) => ({
      ...previous,
      [name]: Number(value),
    }));
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setEmployee((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);
const [result, setResult] = useState<any>(null);
const [error, setError] = useState("");
const handlePredict = async () => {
  setLoading(true);
  setError("");
  setResult(null);

  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    if (!response.ok) {
      throw new Error("Prediction failed");
    }

    const data = await response.json();

    setResult(data);
  } catch (error) {
    console.error(error);
    setError(
      "Unable to connect to the prediction server. Please make sure FastAPI is running."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      {/* Personal Information */}
      <section className="form-section">
        <h2>Personal Information</h2>

        <div className="form-grid">
          <div className="form-field">
            <label>Age</label>
            <input
              name="Age"
              type="number"
              value={employee.Age}
              onChange={handleNumberChange}
            />
          </div>

          <div className="form-field">
            <label>Gender</label>
            <select
              name="Gender"
              value={employee.Gender}
              onChange={handleSelectChange}
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          <div className="form-field">
            <label>Marital Status</label>
            <select
              name="MaritalStatus"
              value={employee.MaritalStatus}
              onChange={handleSelectChange}
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>

          <div className="form-field">
            <label>Education</label>
            <select
              name="Education"
              value={employee.Education}
              onChange={()=>handleNumberChange}
            >
              <option value={1}>1 - Below College</option>
              <option value={2}>2 - College</option>
              <option value={3}>3 - Bachelor</option>
              <option value={4}>4 - Master</option>
              <option value={5}>5 - Doctor</option>
            </select>
          </div>

          <div className="form-field">
            <label>Education Field</label>
            <select
              name="EducationField"
              value={employee.EducationField}
              onChange={handleSelectChange}
            >
              <option value="Life Sciences">Life Sciences</option>
              <option value="Medical">Medical</option>
              <option value="Marketing">Marketing</option>
              <option value="Technical Degree">Technical Degree</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </section>

      {/* Job Information */}
      <section className="form-section">
        <h2>Job Information</h2>

        <div className="form-grid">
          <div className="form-field">
            <label>Department</label>
            <select
              name="Department"
              value={employee.Department}
              onChange={handleSelectChange}
            >
              <option value="Sales">Sales</option>
              <option value="Research & Development">
                Research & Development
              </option>
              <option value="Human Resources">Human Resources</option>
            </select>
          </div>

          <div className="form-field">
            <label>Job Role</label>
            <select
              name="JobRole"
              value={employee.JobRole}
              onChange={handleSelectChange}
            >
              <option value="Sales Executive">Sales Executive</option>
              <option value="Research Scientist">Research Scientist</option>
              <option value="Laboratory Technician">
                Laboratory Technician
              </option>
              <option value="Manufacturing Director">
                Manufacturing Director
              </option>
              <option value="Healthcare Representative">
                Healthcare Representative
              </option>
              <option value="Manager">Manager</option>
              <option value="Sales Representative">
                Sales Representative
              </option>
              <option value="Research Director">Research Director</option>
              <option value="Human Resources">Human Resources</option>
            </select>
          </div>

          <div className="form-field">
            <label>Job Level</label>
            <select
              name="JobLevel"
              value={employee.JobLevel}
              onChange={()=>handleNumberChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          <div className="form-field">
            <label>Business Travel</label>
            <select
              name="BusinessTravel"
              value={employee.BusinessTravel}
              onChange={handleSelectChange}
            >
              <option value="Travel_Rarely">Travel Rarely</option>
              <option value="Travel_Frequently">
                Travel Frequently
              </option>
              <option value="Non-Travel">Non-Travel</option>
            </select>
          </div>

          <div className="form-field">
            <label>Overtime</label>
            <select
              name="OverTime"
              value={employee.OverTime}
              onChange={handleSelectChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="form-field">
            <label>Daily Rate</label>
            <input
              name="DailyRate"
              type="number"
              value={employee.DailyRate}
              onChange={handleNumberChange}
            />
          </div>

          <div className="form-field">
            <label>Hourly Rate</label>
            <input
              name="HourlyRate"
              type="number"
              value={employee.HourlyRate}
              onChange={handleNumberChange}
            />
          </div>

          <div className="form-field">
            <label>Monthly Income</label>
            <input
              name="MonthlyIncome"
              type="number"
              value={employee.MonthlyIncome}
              onChange={handleNumberChange}
            />
          </div>

          <div className="form-field">
            <label>Monthly Rate</label>
            <input
              name="MonthlyRate"
              type="number"
              value={employee.MonthlyRate}
              onChange={handleNumberChange}
            />
          </div>
        </div>
      </section>

      {/* Work & Satisfaction */}
      <section className="form-section">
        <h2>Work & Satisfaction</h2>

        <div className="form-grid">
          <div className="form-field">
            <label>Environment Satisfaction</label>
            <select
              name="EnvironmentSatisfaction"
              value={employee.EnvironmentSatisfaction}
              onChange={()=>handleNumberChange}
            >
              <option value={1}>1 - Low</option>
              <option value={2}>2 - Medium</option>
              <option value={3}>3 - High</option>
              <option value={4}>4 - Very High</option>
            </select>
          </div>

          <div className="form-field">
            <label>Job Involvement</label>
            <select
              name="JobInvolvement"
              value={employee.JobInvolvement}
              onChange={()=>handleNumberChange}
            >
              <option value={1}>1 - Low</option>
              <option value={2}>2 - Medium</option>
              <option value={3}>3 - High</option>
              <option value={4}>4 - Very High</option>
            </select>
          </div>

          <div className="form-field">
            <label>Job Satisfaction</label>
            <select
              name="JobSatisfaction"
              value={employee.JobSatisfaction}
              onChange={()=>handleNumberChange}
            >
              <option value={1}>1 - Low</option>
              <option value={2}>2 - Medium</option>
              <option value={3}>3 - High</option>
              <option value={4}>4 - Very High</option>
            </select>
          </div>

          <div className="form-field">
            <label>Relationship Satisfaction</label>
            <select
              name="RelationshipSatisfaction"
              value={employee.RelationshipSatisfaction}
              onChange={()=>handleNumberChange}
            >
              <option value={1}>1 - Low</option>
              <option value={2}>2 - Medium</option>
              <option value={3}>3 - High</option>
              <option value={4}>4 - Very High</option>
            </select>
          </div>

          <div className="form-field">
            <label>Work Life Balance</label>
            <select
              name="WorkLifeBalance"
              value={employee.WorkLifeBalance}
              onChange={()=>handleNumberChange}
            >
              <option value={1}>1 - Bad</option>
              <option value={2}>2 - Good</option>
              <option value={3}>3 - Better</option>
              <option value={4}>4 - Best</option>
            </select>
          </div>

          <div className="form-field">
            <label>Distance From Home</label>
            <input
              name="DistanceFromHome"
              type="number"
              value={employee.DistanceFromHome}
              onChange={handleNumberChange}
            />
          </div>
        </div>
      </section>

      {/* Experience & Career */}
      <section className="form-section">
        <h2>Experience & Career</h2>

        <div className="form-grid">
          <div className="form-field">
            <label>Total Working Years</label>
            <input
              name="TotalWorkingYears"
              type="number"
              value={employee.TotalWorkingYears}
              onChange={handleNumberChange}
            />
          </div>

          <div className="form-field">
            <label>Years At Company</label>
            <input
              name="YearsAtCompany"
              type="number"
              value={employee.YearsAtCompany}
              onChange={handleNumberChange}
            />
          </div>

          <div className="form-field">
            <label>Years In Current Role</label>
            <input
              name="YearsInCurrentRole"
              type="number"
              value={employee.YearsInCurrentRole}
              onChange={handleNumberChange}
            />
          </div>

          <div className="form-field">
            <label>Years Since Last Promotion</label>
            <input
              name="YearsSinceLastPromotion"
              type="number"
              value={employee.YearsSinceLastPromotion}
              onChange={handleNumberChange}
            />
          </div>

          <div className="form-field">
            <label>Years With Current Manager</label>
            <input
              name="YearsWithCurrManager"
              type="number"
              value={employee.YearsWithCurrManager}
              onChange={handleNumberChange}
            />
          </div>

          <div className="form-field">
            <label>Number Of Companies Worked</label>
            <input
              name="NumCompaniesWorked"
              type="number"
              value={employee.NumCompaniesWorked}
              onChange={handleNumberChange}
            />
          </div>

          <div className="form-field">
            <label>Training Times Last Year</label>
            <input
              name="TrainingTimesLastYear"
              type="number"
              value={employee.TrainingTimesLastYear}
              onChange={handleNumberChange}
            />
          </div>
        </div>
      </section>

      {/* Performance & Compensation */}
      <section className="form-section">
        <h2>Performance & Compensation</h2>

        <div className="form-grid">
          <div className="form-field">
            <label>Performance Rating</label>
            <select
              name="PerformanceRating"
              value={employee.PerformanceRating}
              onChange={()=>handleNumberChange}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>

          <div className="form-field">
            <label>Percent Salary Hike</label>
            <input
              name="PercentSalaryHike"
              type="number"
              value={employee.PercentSalaryHike}
              onChange={handleNumberChange}
            />
          </div>

          <div className="form-field">
            <label>Stock Option Level</label>
            <select
              name="StockOptionLevel"
              value={employee.StockOptionLevel}
              onChange={()=>handleNumberChange}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
        </div>
      </section>
      <div className="prediction-area">
  <button
    type="button"
    className="predict-button"
    onClick={handlePredict}
    disabled={loading}
  >
    {loading ? "Predicting..." : "Predict Attrition"}
  </button>
</div>
{error && <div className="error-message">{error}</div>}

{result && (
  <div className={`result-card ${result.risk_level.toLowerCase()}`}>
    <h2>Prediction Result</h2>

    <div className="result-percentage">
      {result.attrition_percentage}%
    </div>

    <p className="result-label">
      Probability of employee attrition
    </p>

    <div className="risk-level">
      Risk Level: <strong>{result.risk_level}</strong>
    </div>

    <div className="prediction-status">
      {result.prediction === 1
        ? "⚠️ Employee is at risk of leaving"
        : "✅ Employee is unlikely to leave"}
    </div>

    {result.risk_factors?.length > 0 && (
      <div className="risk-factors">
        <h3>Risk Factors</h3>

        <ul>
          {result.risk_factors.map(
            (factor: string, index: number) => (
              <li key={index}>{factor}</li>
            )
          )}
        </ul>
      </div>
    )}
  </div>
)}
    </div>
  );
}

export default EmployeeForm;