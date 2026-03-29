// Lazy loading (performance boost)

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";

const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Tickets = lazy(() => import("../pages/Tickets"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/Login" element={<Login />} />
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <Layout>
                <Tickets />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* 404 Error */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
export default AppRoutes;
