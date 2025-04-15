import { Routes, Route } from "react-router-dom";
import App from '../App';
import Administrador from "../componentes/admin";
import SistemForm from "../componentes/sistemform";
import ModuleForm from "../componentes/moduleform";
import SectionForm from "../componentes/sectionform";
import ListGuide from "../componentes/listguide";
import SystemCard from "../componentes/systemcard";
import SystemInfo from "../componentes/systeminfo";



function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/administrador" element={<Administrador />} />
      <Route path="/sistemform" element={<SistemForm />} />
      <Route path="/moduleform" element={<ModuleForm />} />
      <Route path="/sectionform" element={<SectionForm />} />
      <Route path="/listguide" element={<ListGuide />} />
      <Route path="/systemcard/:id" element={<SystemCard />} />
      <Route path="/sistemas/:id/:idModulo?/:idGuia?" element={<SystemInfo />} />
      {/* Ruta más específica primero */}
      <Route path="/sistemas/:id" element={<SystemInfo />} />  {/* Ruta más general después */}

    </Routes>
  );
}

export default AppRoutes;

