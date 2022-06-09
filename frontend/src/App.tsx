import { Route, Router, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import "./index.css";
import { MainLayout } from "./layouts/MainLayout";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

const TEST = () => <h1>ola</h1>
const TEST2 = () => <h1>ola2</h1>


const App = () => {
  return (
    <div className="font-montserrat">
      <Routes>        
        <Route element={<MainLayout/>}>
          <Route path="/"/>
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
