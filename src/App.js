import Navbar from "./Navbar";
import Employee from "./Page/Employee";
import Task from "./Page/Task";
import Home from "./Home";
import TaskChart from "./Page/Task/TaskChart";
import Team from "./Page/Teams";
import { Route, Routes } from "react-router-dom";

function App(){
  return (
    <>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/employee" element={<Employee />}/> 
          <Route path="/task" element={<Task />}/>
          <Route path="/chart" element={<TaskChart />}/>
          <Route path="/team" element={<Team />}/>
        </Routes>
      </div>
    </>

  ) 
}

export default App