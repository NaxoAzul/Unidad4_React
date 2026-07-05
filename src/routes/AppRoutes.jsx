import { BrowserRouter, Routes, Route } from "react-router-dom";

import MySchedulesPage from "../pages/coach/MySchedulesPage";
import MyClassesPage from "../pages/coach/MyClassesPage";
import MyReservationsPage from "../pages/user/MyReservationsPage";
import AvailableClassesPage from "../pages/user/AvailableClassesPage";
import SchedulesPage from "../pages/admin/SchedulesPage";
import AssignmentsPage from "../pages/admin/AssignmentsPage";
import RoomsPage from "../pages/admin/RoomsPage";
import SportsPage from "../pages/admin/SportsPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Unauthorized from "../pages/Unauthorized";

import UserDashboard from "../pages/user/UserDashboard";
import CoachDashboard from "../pages/coach/CoachDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UsersPage from "../pages/admin/UsersPage";
import Profile from "../pages/Profile";

import UserLayout from "../layouts/UserLayout";
import CoachLayout from "../layouts/CoachLayout";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route
                    path="/user"
                    element={
                        <ProtectedRoute>
                            <RoleRoute allowedRoles={["user"]}>
                                <UserLayout />
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                >
                    <Route path="dashboard" element={<UserDashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="classes" element={<AvailableClassesPage />} />
                    <Route path="reservations" element={<MyReservationsPage />} />
                </Route>

                <Route
                    path="/coach"
                    element={
                        <ProtectedRoute>
                            <RoleRoute allowedRoles={["coach"]}>
                                <CoachLayout />
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                >
                    <Route path="dashboard" element={<CoachDashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="my-classes" element={<MyClassesPage />} />
                    <Route path="my-schedules" element={<MySchedulesPage />} />
                </Route>

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <RoleRoute allowedRoles={["admin"]}>
                                <AdminLayout />
                            </RoleRoute>
                        </ProtectedRoute>
                    }
                >
                    <Route path="sports" element ={<SportsPage />} />
                    <Route path="rooms" element={<RoomsPage />} />
                    <Route path="assignments" element={<AssignmentsPage />} />
                    <Route path="schedules" element={<SchedulesPage />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;