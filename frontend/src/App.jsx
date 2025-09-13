// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider";
// import Navbar from "./components/common/Navbar";
// import ProtectedRoute from "./components/common/ProtectedRoute";
// import Login from "./components/auth/Login";
// import Signup from "./components/auth/Signup";
// import Profile from "./components/auth/Profile";
// import Dashboard from "./components/user/Dashboard";
// import VotingPanel from "./components/user/VotingPanel";
// import AdminDashboard from "./components/admin/AdminDashboard";
// import UserManagement from "./components/admin/UserManagement";
// import CandidateManagement from "./components/admin/CandidateManagement";
// import VotingResults from "./components/admin/VotingResults";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen bg-gray-50">
//           <Navbar />
//           <div className="container mx-auto px-4 py-8">
//             <Routes>
//               {/* Public Routes */}
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />

//               {/* Protected User Routes */}
//               <Route
//                 path="/dashboard"
//                 element={
//                   <ProtectedRoute allowedRoles={["voter", "admin"]}>
//                     <Dashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/vote"
//                 element={
//                   <ProtectedRoute allowedRoles={["voter"]}>
//                     <VotingPanel />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/profile"
//                 element={
//                   <ProtectedRoute allowedRoles={["voter", "admin"]}>
//                     <Profile />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Admin Routes */}
//               <Route
//                 path="/admin/dashboard"
//                 element={
//                   <ProtectedRoute allowedRoles={["admin"]}>
//                     <AdminDashboard />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/users"
//                 element={
//                   <ProtectedRoute allowedRoles={["admin"]}>
//                     <UserManagement />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/candidates"
//                 element={
//                   <ProtectedRoute allowedRoles={["admin"]}>
//                     <CandidateManagement />
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/admin/results"
//                 element={
//                   <ProtectedRoute allowedRoles={["admin"]}>
//                     <VotingResults />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* Default Route */}
//               <Route path="/" element={<Navigate to="/login" replace />} />
//             </Routes>
//           </div>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
///////////////////////////////////////////////////////////////////////////
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/auth/Profile";
import Dashboard from "./components/user/Dashboard";
import VotingPanel from "./components/user/VotingPanel";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserManagement from "./components/admin/UserManagement";
import CandidateManagement from "./components/admin/CandidateManagement";
import VotingResults from "./components/admin/VotingResults";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes with Auth Layout */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <Signup />
              </AuthLayout>
            }
          />

          {/* Protected User Routes with Dashboard Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["voter", "admin"]}>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vote"
            element={
              <ProtectedRoute allowedRoles={["voter"]}>
                <DashboardLayout>
                  <VotingPanel />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["voter", "admin"]}>
                <DashboardLayout>
                  <Profile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout>
                  <UserManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/candidates"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout>
                  <CandidateManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/results"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <DashboardLayout>
                  <VotingResults />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
