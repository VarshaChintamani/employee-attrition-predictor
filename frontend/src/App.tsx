import EmployeeForm from "./EmployeeForm";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Employee Attrition Predictor</h1>
        <p>
          Predict whether an employee is at risk of leaving.
        </p>
      </header>

      <main className="form-card">
        <EmployeeForm />
      </main>
    </div>
  );
}

export default App;