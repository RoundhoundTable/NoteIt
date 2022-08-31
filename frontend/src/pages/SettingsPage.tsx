import {
  Tab,
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import { ProfileHeader } from "../components/ProfileHeader";
import { Navigate } from "react-router-dom";
import { ProfileTab } from "./Settings/ProfileTab";
import { AccountTab } from "./Settings/AccountTab";
import { useAuth } from "../context/AuthProvider";

export const SettingsPage = () => {
  const { currentUser } = useAuth();

  return currentUser ? (
    <div className="flex flex-col gap-5 items-center w-full">
      <ProfileHeader {...currentUser} />
      <Tabs
        className="p-5 w-3/4 shadow-lg shadow-primary-500/50"
        value="profile"
      >
        <TabsHeader className="w-full">
          <Tab
            className="z-0 text-primary-500 font-semibold w-1/2 md:w-36 py-2 border-primary-500 border-b-4"
            value="profile"
          >
            Perfil
          </Tab>
          <Tab
            className="z-0 text-gray-400 font-semibold w-1/2 md:w-36 py-2 border-gray-300 border-b-2"
            value="account"
          >
            Cuenta
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="profile">
            <ProfileTab />
          </TabPanel>
          <TabPanel value="account">
            <AccountTab />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
