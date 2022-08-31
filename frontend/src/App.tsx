import { Route, Routes } from "react-router-dom";
import "./styles/index.css";
import { AccountLayout } from "./layouts/AccountLayout";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";
import { NotePage } from "./pages/NotePage";
import { SettingsPage } from "./pages/SettingsPage";
import { SearchResultPage } from "./pages/SearchResultPage";
import { NoteBookPages } from "./pages/NotebookPage";
import { CreatePage } from "./pages/CreatePage";
import { MobileSearchPage } from "./pages/MobileSearchPage";
import { EditNotePage } from "./pages/EditNotePage";
import { AuthProvider } from "./context/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/new" element={<CreatePage />} />
          <Route path="/u/:username" element={<ProfilePage />} />
          <Route path="/n/:id" element={<NotePage />} />
          <Route path="/n/edit/:id" element={<EditNotePage />} />
          <Route path="/nb/:name" element={<NoteBookPages />} />
          <Route path="/s/" element={<MobileSearchPage />} />
          <Route path="/s/:query" element={<SearchResultPage />} />
          <Route path="/account/settings" element={<SettingsPage />} />
          <Route
            path="*"
            element={
              <ErrorPage
                title="404"
                message="Lo sentimos, esta página no existe"
              />
            }
          />
        </Route>
        <Route element={<AccountLayout />}>
          <Route path="/account/login" element={<LoginPage />} />
          <Route path="/account/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
