import { Routes, Route } from "react-router";
import { OffererPage } from "../pages/OffererPage";
import { InterestedPage } from "../pages/InterestedPage";
import { OferrerInteresteesPage } from "../pages/OferrerInteresteesPage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ResgisterOfferer } from "../components/common/RegisterOfferer";
import { RegisterInterested } from "../components/common/RegisterInterested";
import { InterestedConectionsPage } from "../pages/InterestedConections";
import { MaintenencePage } from "../pages/MaintenencePage";
import { CreateAnimal } from "../pages/CreateAnimal";
import { EditInterested } from "../components/Interested/EditInterested";
import { EditOfferer } from "../components/Offerers/EditOfferer";
import { EditAnimal } from "../pages/EditAnimal";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="register/offerer" element={<ResgisterOfferer/>}/>
      <Route path="register/interested" element={<RegisterInterested/>}/>
      <Route path="offerer" element={<OffererPage />} />
      <Route path="offerer/interestees" element={<OferrerInteresteesPage />} />
      <Route path="offerer/adoption" element={<CreateAnimal />} />
      <Route path="interested" element={<InterestedPage />} />
      <Route path="interested/connections" element={<InterestedConectionsPage />} />
      <Route path="interested/sales" element={<MaintenencePage />} />
      <Route path="interested/edit" element={<EditInterested />} />
      <Route path="offerer/edit" element={<EditOfferer />} />
      <Route path="offerer/animal/edit" element={<EditAnimal />} />

    </Routes>
  );
};
