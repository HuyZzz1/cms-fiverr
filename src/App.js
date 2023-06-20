import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import LayoutAdmin from "./components/Layout";
import UserManagement from "./pages/UserManagement";
import JobManagement from "./pages/JobManagement";
import JobTypeManagement from "./pages/JobTypeManagement";
import ServiceManagement from "./pages/ServiceManagement";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/sign-in" element={<SignIn />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route path="/" element={<UserManagement />} />
          <Route path="/admin/job-management" element={<JobManagement />} />
          <Route
            path="/admin/job-type-management"
            element={<JobTypeManagement />}
          />
          <Route
            path="/admin/service-management"
            element={<ServiceManagement />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
