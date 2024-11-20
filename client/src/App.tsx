import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";
import { routesArr } from "./routes";
import { Suspense } from "react";
import Loader from "./components/loader/Loader";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/callback" element={<Dashboard />} /> */}
            <Route path="/callback" element={<Navigate to="/profile" />} />
            <Route element={<Dashboard />}>
              {routesArr.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Suspense fallback={<Loader message="Loading..." />}>
                      <route.element />
                    </Suspense>
                  }
                />
              ))}
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
