import "./App.css"
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CommandsPage from './pages/commands';
import Blah from "./unused";
import Admin from "./pages/admin";
import CommandPage from "./pages/command";
import PageView from "./components/layout/page-view";
import TestInput from "./pages/testinput";

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
        </Routes>
        </PageView>} />
    </Routes>
  </Router>
  );
}