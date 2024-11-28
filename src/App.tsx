import "./App.css"
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Splash from './pages/splash';
import CommandsPage from './pages/commands';
import Blah from "./unused";
import Admin from "./pages/admin";
import CommandPage from "./pages/command";
import PageView from "./components/layout/page-view";
import TestInput from "./pages/testinput";
import AutoComplete from "./pages/testinput/autocomplete";
import AutoComplete2 from "./pages/testinput/autocomplete2";
import PlaceholdersList from "@/pages/ph_list";
import Home from "./pages/home";
import OAuth2 from "./pages/oauth2";
import LoginPage from "./pages/login";
import LogoutPage from "./pages/logout";
import CustomTable from "@/pages/custom_table";
import NationPicker from "@/pages/nation_picker";
import GuildPicker from "@/pages/guild_picker";
import LoginPickerPage from "@/pages/login_picker";
import React, {ReactNode} from "react";
import Unregister from "@/pages/unregister";
import GuildMember from "@/pages/guild_member";
import {hasToken} from "@/utils/Auth.ts";
import Announcements from "@/pages/announcements";
import {Announcement} from "@/pages/announcement";
import BalancePage from "@/pages/balance";
import Records from "@/pages/records";
import TableTest from "./unused/tabletest";

export default function App() {
  return (
    <Router>
    <Routes>
      <Route path="" element={<Splash />} />
      <Route path="*" element={<PageView>
        <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/guild_member" element={<LoggedInRoute><GuildMember /></LoggedInRoute>} />
        <Route path="/unregister" element={<LoggedInRoute><Unregister /></LoggedInRoute>} />
        <Route path="/guild_select" element={<LoggedInRoute><GuildPicker /></LoggedInRoute>} />

        <Route path="/announcements" element={<LoggedInRoute><Announcements /></LoggedInRoute>} />
        <Route path="/announcement/:id" element={<LoggedInRoute><Announcement /></LoggedInRoute>} />
        <Route path="/announcement" element={<LoggedInRoute><Announcements /></LoggedInRoute>} />

        <Route path="/commands" element={<CommandsPage />} />
        <Route path="/command" element={<CommandsPage />} />
        <Route path="/command/:command" element={<CommandPage />} />
        <Route path="/placeholders/:placeholder" element={<PlaceholdersList />} />

        <Route path="/balance" element={<BalancePage />} />
        <Route path="/balance/:category" element={<BalancePage />} />
        <Route path="/records" element={<Records />} />

        <Route path="/login" element={<LoginPickerPage />} />
        <Route path="/login/:token" element={<LoginPage />} />
        <Route path="/oauth2" element={<OAuth2 />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/nation_picker" element={<NationPicker />} />
        <Route path="/register" element={<Unregister />} />

        <Route path="/custom_table" element={<CustomTable />} />



        {/* testing pages */}
          <Route path="/tabletest" element={<TableTest />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/autocomplete" element={<AutoComplete />} />
        <Route path="/auto2" element={<AutoComplete2 />} />

        <Route path="/blah" element={<Blah />} />
        <Route path="/testinput" element={<TestInput />} />
        </Routes>
        </PageView>} />
    </Routes>
  </Router>
  );
}

const LoggedInRoute = ({ children }: { children: ReactNode }) => {
    return hasToken() ? children : <LoginPickerPage />;
};