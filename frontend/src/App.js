// Libs
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Routes
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

// Pages
import Login from "./pages/login";
import Profile from "./pages/profile";
import Home from "./pages/home";
import Activate from "./pages/home/Activate";
import Reset from "./pages/reset";

// Components
import CreatePostPopup from "./components/createPostPopup";
import { useState } from "react";

function App() {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/" element={<Home setVisible={setVisible} />} />
          <Route path="/activate/:token" element={<Activate />} />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
