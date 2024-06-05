import "./App.css"
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Commands from './commands';
import Blah from "./blah";
import Admin from "./admin";
import { ThemeProvider } from "./components/ui/theme-provider";
import CommandTest from "./commands/CommandTest";

export default function App() {
  return (
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
          <Routes>
          <Route path="/commands" element={<Commands />} />
          <Route path="/CommandTest" element={<CommandTest />} />
          <Route path="/blah" element={<Blah />} />
          <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Home />} />
          </Routes>
      </Router>
      </ThemeProvider>  
  );
}