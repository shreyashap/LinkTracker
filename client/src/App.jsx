import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import React from "react";
import AnalyticsPage from "./pages/Analytics";
import Home from "./pages/Home";
import AppInit from "./components/AppInit";
import QRCodes from "./components/QRCode";
import AuthProvider from "./components/AuthProvider";

function App() {
  return (
    <Router>
      <AppInit />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <Layout isDashboard="true">
                <AuthProvider>
                  <Dashboard />
                </AuthProvider>
              </Layout>
            }
          />
          <Route
            path="/analytics/:id"
            element={
              <AuthProvider>
                <AnalyticsPage />
              </AuthProvider>
            }
          />
          <Route
            path="/qr"
            element={
              <Layout>
                <AuthProvider>
                  <QRCodes />
                </AuthProvider>
              </Layout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
