import EmployeesList from "./components/EmployeesList";
import "./App.css";

const App = () => {
  return (
    <div className="h-screen min-h-screen py-6 bg-neutral-200">
      <div className="container h-full mx-auto px-4">
        <EmployeesList />
      </div>
    </div>
  );
};

export default App;
