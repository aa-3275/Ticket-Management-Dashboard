// Lazy loading (performance boost)

import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";

const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Tickets = lazy(() => import("../pages/Tickets"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = ({ theme, setTheme }) => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route path="/Login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout theme={theme} setTheme={setTheme}>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute role="admin">
              <Layout theme={theme} setTheme={setTheme}>
                <Tickets />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
export default AppRoutes;
