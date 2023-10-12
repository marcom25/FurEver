import { Routes, Route } from "react-router";
import { OffererPage } from "../pages/OffererPage";
import { InterestedPage } from "../pages/InterestedPage";
import { OferrerInteresteesPage } from "../pages/OferrerInteresteesPage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { InterestedConectionsPage } from "../pages/InterestedConections";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="offerer" element={<OffererPage />} />
      <Route path="offerer/interestees" element={<OferrerInteresteesPage />} />
      <Route path="interested" element={<InterestedPage />} />
      <Route path="interested/conections" element={<InterestedConectionsPage />} />
    </Routes>
  );
};
