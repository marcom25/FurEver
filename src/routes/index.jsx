import { Routes, Route } from "react-router";
import { LandingOfferer } from "./layouts/LandingOfferer";
import { LandingInterested } from "./layouts/LandingInterested";
import { OferrerInteresteesPage } from "./pages/OferrerInteresteesPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="offerer" element={<LandingOfferer />} />
      <Route path="offerer/interestees" element={<OferrerInteresteesPage />} />
      <Route path="interested" element={<LandingInterested />} />
    </Routes>
  );
};
