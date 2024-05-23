import "./App.css"
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Start from './start';


export default function App() {
  return (
      <Router>
          <Routes>
              <Route path="/start" element={<Start />} />
              <Route path="*" element={<Home />} />
          </Routes>
      </Router>
  );
};