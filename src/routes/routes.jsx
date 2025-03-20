import { Routes, Route } from "react-router-dom";
import SiAdmin from '../componentes/soportesiadmin';
import Ekkipo from '../componentes/soporteekkipo';
import SiAdminWeb from '../componentes/soportesiadminweb';
import Guia from "../guia";
import App from '../App';
import Administrador from "../componentes/admin";
import SistemForm from "../componentes/sistemform";
import ModuleForm from "../componentes/moduleform";
import SectionForm from "../componentes/sectionform";
import ListGuide from "../componentes/listguide";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/si-admin" element={<SiAdmin />} />
      <Route path="/ekkipo" element={<Ekkipo />} />
      <Route path="/si-admin-web" element={<SiAdminWeb />} />
      <Route path="/:module/:guide" element={<Guia />} />
      <Route path="/administrador" element={<Administrador />} />
      <Route path="/sistemform" element={<SistemForm />} />
      <Route path="/moduleform" element={<ModuleForm />} />
      <Route path="/sectionform" element={<SectionForm />} />
      <Route path="/listguide" element={<ListGuide />} />
    </Routes>
  );
}

export default AppRoutes;

