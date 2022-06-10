import { Route, Router, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "./index.css";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";

const App = () => {
  return (
    <div className="font-montserrat">
      <Routes>        
        <Route element={<MainLayout/>}>
          <Route path="/"/>
          <Route path="/u/:username" element={<ProfilePage/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Route>
        <Route path="account">
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
