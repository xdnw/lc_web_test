import "./App.css"
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Start from './start';
import Blah from "./blah";
import Admin from "./admin";
import { ThemeProvider } from "./components/ui/theme-provider";

export default function App() {
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
          <Routes>
          <Route path="/start" element={<Start />} />
          <Route path="/blah" element={<Blah />} />
          <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Home />} />
          </Routes>
      </Router>
      </ThemeProvider>  
  );
};