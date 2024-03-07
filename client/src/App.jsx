import { useGetAllEmployeesQuery } from "./store/services/employees";
import EmployeesList from "./components/EmployeesList";
import Spinner from "./components/ui/Spinner";
import "./App.css";

function App() {
  const { data, isLoading, error } = useGetAllEmployeesQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  if (error) return <p>Error fetching employees: {error.message}</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <EmployeesList employees={data} />
    </div>
  );
}

export default App;
