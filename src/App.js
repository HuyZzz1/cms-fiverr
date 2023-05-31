import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/Admin/SignIn";
import LayoutAdmin from "./components/Layout/Admin";
import UserManagement from "./pages/Admin/UserManagement";
import WorkManagement from "./pages/Admin/WorkManagement";
import JobTypeManagement from "./pages/Admin/JobTypeManagement";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin/sign-in" element={<SignIn />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route path="/" element={<UserManagement />} />
          <Route path="/admin/work-management" element={<WorkManagement />} />
          <Route
            path="/admin/job-type-management"
            element={<JobTypeManagement />}
          />
          <Route path="/admin/service-management" />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
