import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { PasswordFormPage } from "./pages/PasswordFormPage";
import { PasswordShowFormPage } from "./pages/PasswordShowFormPage";
import { LoginPage } from "./pages/LoginPage";
import { PasswordsPage } from "./pages/PasswordsPage";
import { PasswordProvider } from "./context/passwordsContext";

function App() {
  return (
    <AuthProvider>
      <PasswordProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/passwords" element={<PasswordsPage />} />
                <Route path="/add-password" element={<PasswordFormPage />} />
                <Route path="/passwords/:id" element={<PasswordFormPage />} />
                <Route path="/passwords-show/:id" element={<PasswordShowFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </PasswordProvider>
    </AuthProvider>
  );
}

export default App;