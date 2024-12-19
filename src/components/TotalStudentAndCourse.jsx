import React from "react";
import { Pie,Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

// Register ChartJS components
ChartJS.register(...registerables);

function TotalStudentAndCourse({ allstudent, allcourse }) {
    console.log("Students: ", allstudent);
    console.log("Courses: ", allcourse);

    // Calculate the total number of students and courses
    const totalStudents = allstudent;
    const totalCourses = allcourse;

    // Pie chart data
    const chartData = {
        labels: ["Total Students", "Total Courses"],
        datasets: [
            {
                data: [totalStudents, totalCourses],
                backgroundColor: ["#36A2EB", "#FF6384"],
                hoverBackgroundColor: ["#36A2EB", "#FF6384"],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
      
        plugins: {
          legend: {
            position: "top", // Legend position at the top
          },
        },
      };

    return (
        <div className="flex justify-around items-center mt-4">
            <div className="w-64">
                {/* Displaying Pie Chart */}
                <Pie data={chartData} />
            </div>

            <div className="w-72">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
}

export default TotalStudentAndCourse;
