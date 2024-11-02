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
import TableTest from "@/pages/tabletest";
import NationPicker from "@/pages/nation_picker";
import GuildPicker from "@/pages/guild_picker";
import LoginPickerPage from "@/pages/login_picker";
import React from "react";

export default function App() {
  return (
    <Router>
    <Routes>
      <Route path="" element={<Splash />} />
      <Route path="*" element={<PageView>
        <Routes>
        <Route path="/home" element={<Home />} />
            <Route path="/commands" element={<CommandsPage />} />
            <Route path="/command" element={<CommandsPage />} />
            <Route path="/command/:command" element={<CommandPage />} />
            <Route path="/placeholders/:placeholder" element={<PlaceholdersList />} />

            <Route path="/login" element={<LoginPickerPage />} />
            <Route path="/login/:token" element={<LoginPage />} />
            <Route path="/oauth2" element={<OAuth2 />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/nation_picker" element={<NationPicker />} />
            <Route path="/guild_select" element={<GuildPicker />} />

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