import { Routes, Route } from "react-router";
import { OffererPage } from "../pages/OffererPage";
import { InterestedPage } from "../pages/InterestedPage";
import { OferrerInterestees } from "../pages/OferrerInteresteesPage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ResgisterOfferer } from "../components/common/RegisterOfferer";
import { RegisterInterested } from "../components/common/RegisterInterested";
import { InterestedConectionsPage } from "../pages/InterestedConections";
import { MaintenencePage } from "../pages/MaintenencePage";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="register/offerer" element={<ResgisterOfferer/>}/>
      <Route path="register/interested" element={<RegisterInterested/>}/>
      <Route path="offerer" element={<OffererPage />} />
      <Route path="offerer/interestees" element={<OferrerInterestees />} />
      <Route path="interested" element={<InterestedPage />} />
      <Route path="interested/conections" element={<InterestedConectionsPage />} />
      <Route path="interested/sales" element={<MaintenencePage />} />
    </Routes>
  );
};
