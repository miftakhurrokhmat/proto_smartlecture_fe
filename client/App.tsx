import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Index from "./pages/Index";
import StudentHome from "./pages/StudentHome";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { getUser } from "@/lib/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              getUser() ? (
                <Navigate to={getUser()?.role === "student" ? "/student" : "/teacher"} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/teacher" element={getUser()?.role === "instructor" ? <Index /> : <Navigate to="/login" replace />} />
          <Route path="/student" element={getUser()?.role === "student" ? <StudentHome /> : <Navigate to="/login" replace />} />
          {/* Placeholder routes */}
          <Route path="/sessions" element={<NotFound />} />
          <Route path="/materials" element={<NotFound />} />
          <Route path="/discussions" element={<NotFound />} />
          <Route path="/students" element={<NotFound />} />
          <Route path="/reports" element={<NotFound />} />
          <Route path="/settings" element={<NotFound />} />
          <Route path="/my-sessions" element={<NotFound />} />
          <Route path="/transcripts" element={<NotFound />} />
          <Route path="/summary" element={<NotFound />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
