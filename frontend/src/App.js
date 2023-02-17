// Libs
import { Routes, Route } from "react-router-dom";

// Routes
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

// Pages
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import Activate from "./pages/home/Activate";

function App() {
  return (
    <Routes>
      <Route element={<LoggedInRoutes />}>
        <Route path="/profile" element={<Profile />} exact />
        <Route path="/" element={<Home />} />
        <Route path="/activate/:token" element={<Activate />} />
      </Route>
      <Route element={<NotLoggedInRoutes />}>
        <Route path="/login" element={<Login />} exact />
      </Route>
    </Routes>
  );
}

export default App;
