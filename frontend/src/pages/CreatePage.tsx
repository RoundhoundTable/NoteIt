import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "../context/AuthProvider";
import { CreateNotebookPage } from "./Create/CreateNotebookPage";
import { CreateNotePage } from "./Create/CreateNotePage";

export const CreatePage = () => {
  const { currentUser } = useAuth() as AuthContext;

  if (!currentUser) return <Navigate to="/" />;

  return (
    <Tabs className="p-5 w-full h-full" value="note">
      <TabsHeader className="w-full">
        <Tab
          className="text-primary-500 font-semibold w-1/2 md:w-36 py-2 border-primary-500 border-b-4"
          value="note"
        >
          Note
        </Tab>
        <Tab
          className="text-gray-400 font-semibold w-1/2 md:w-36 py-2 border-gray-300 border-b-2"
          value="notebook"
        >
          Notebook
        </Tab>
      </TabsHeader>
      <TabsBody>
        <TabPanel value="note">
          <CreateNotePage />
        </TabPanel>
        <TabPanel value="notebook">
          <CreateNotebookPage />
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
};
