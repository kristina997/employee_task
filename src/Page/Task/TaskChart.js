import React, { useState, useEffect } from 'react';
import "../../App.css";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

function TaskChart() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks !== null) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // function that returns the total number of tasks per year
  const countTasksByYear = (year) => {
    let count = 0;
    tasks.forEach((task) => {
      const taskYear = new Date(task.date).getFullYear();
      if (taskYear === year) {
        count++;
      }
    });
    return count;
  };

  const taskCountData = [
    { name: "2020", value: countTasksByYear(2020) },
    { name: "2021", value: countTasksByYear(2021) },
    { name: "2022", value: countTasksByYear(2022) },
    { name: "2023", value: countTasksByYear(2023) },
  ];

  const getTopEmployees = (tasks) => {
    // create an object to store the number of tasks per employee
    const taskCount = {};
    tasks.forEach((task) => {
      // check if the task has been executed in the last 30 days
      const taskDate = new Date(task.date);
      const today = new Date();
      const daysAgo = new Date(today.setDate(today.getDate() - 30));
      if (taskDate >= daysAgo) {
        // increment the number of tasks for the corresponding employee.
        if (task.employee in taskCount) {
          taskCount[task.employee]++;
        } else {
          taskCount[task.employee] = 1;
        }
      }
    });
  
    // sort employees by number of tasks.
    const sortedEmployees = Object.keys(taskCount).sort(
      (a, b) => taskCount[b] - taskCount[a]
    );
  
    // to return the top 5 employees
    return sortedEmployees.slice(0, 5);
  };

  const topEmployees = getTopEmployees(tasks);
  const topEmployeeData = topEmployees.map((employee) => ({
    name: `${employee}`,
    value: tasks.filter((task) => task.employee === employee).length,
  }));
  
  // dynamic generation of X-axis labels
  const labels = taskCountData.map((obj) => obj.name);
 
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "#516bcb" }}>Tasks of the past month / Tasks Over Time</h1>
      <div className="App">
        <PieChart width={400} height={400}>
        <Pie
            dataKey="value"
            isAnimationActive={false}
            data={topEmployeeData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
        />
        <text x={190} y={350} textAnchor="middle" fill="#8884d8">
            <tspan x="190" dy="1.2em">
                See who are the top 5 employees
            </tspan>
            <tspan x="190" dy="1.2em">
                who completed the largest number of tasks
            </tspan>
        </text>
          <Tooltip />
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={taskCountData}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
};

export default TaskChart;

