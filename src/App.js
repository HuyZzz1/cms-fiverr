import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import LayoutAdmin from "./components/Layout";
import UserManagement from "./pages/UserManagement";
import WorkManagement from "./pages/WorkManagement";
import JobTypeManagement from "./pages/JobTypeManagement";
import BookingJob from "./pages/BookingJob";

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
          <Route path="/admin/service-management" element={<BookingJob />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
