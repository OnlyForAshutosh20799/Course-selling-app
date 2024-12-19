import React from 'react';
import Signup from './components/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import Home from './components/Home';
import AddCourses from './components/AddCourses';
import AddStudent from './components/AddStudent';
import CollectFee from './components/CollectFee';
import PaymentHistory from './components/PaymentHostory';
import Student from './components/Student';
import CouresDeatils from './components/CouresDeatils';
import StudentDetails from './components/StudentDetails';

function App() {
  const myRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "login", element: <Login /> },
    { path: "signup", element: <Signup /> },
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        { path: "", element: <Home /> }, // Default child route for dashboard
        { path: "courses", element: <Courses /> },
        { path: "add-course", element: <AddCourses /> },
        { path: "students", element: <Student /> },
        { path: "add-student", element: <AddStudent /> },
        { path: "collect-fee", element: <CollectFee /> },
        { path: "payment-history", element: <PaymentHistory /> },
        { path: 'course-details/:id', element: <CouresDeatils /> },
        { path: 'update-course/:id', element: <AddCourses /> },
        { path: 'update-student/:id', element: <AddStudent /> },
        { path: 'student-detail/:id', element: <StudentDetails /> }
      ],
    },
  ]);

  return (
    <div className=''>
      <RouterProvider router={myRouter} />
    </div>
  );
}

export default App;
