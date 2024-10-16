import "./App.css"
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import CommandsPage from './pages/commands';
import Blah from "./unused";
import Admin from "./pages/admin";
import CommandPage from "./pages/command";
import PageView from "./components/layout/page-view";
import TestInput from "./pages/testinput";
import AutoComplete from "./pages/testinput/autocomplete";
import AutoComplete2 from "./pages/testinput/autocomplete2";
import PlaceholdersList from "@/pages/ph_list";
import TableTest from "@/pages/tabletest";

export default function App() {
  return (
    <Router>
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="*" element={<PageView>
        <Routes>
            <Route path="/commands" element={<CommandsPage />} />
            <Route path="/command" element={<CommandPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/blah" element={<Blah />} />
            <Route path="/testinput" element={<TestInput />} />
            <Route path="/tabletest" element={<TableTest />} />
            <Route path="/autocomplete" element={<AutoComplete />} />
            <Route path="/auto2" element={<AutoComplete2 />} />
            <Route path="/placeholders/:placeholder" element={<PlaceholdersList />} />
        </Routes>
        </PageView>} />
    </Routes>
  </Router>
  );
}