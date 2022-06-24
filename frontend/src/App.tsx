import { Route, Routes } from "react-router-dom";
import "./index.css";
import { AccountLayout } from "./layouts/AccountLayout";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";

const App = () => {
  return (
    <div className="font-montserrat">
      <Routes>        
        <Route element={<MainLayout/>}>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/u/:username" element={<ProfilePage/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Route>
        <Route element={<AccountLayout/>}>
          <Route path="/account/login" element={<LoginPage/>}/>
          <Route path="/account/register" element={<RegisterPage/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
