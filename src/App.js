import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Introduction from "./pages/Introduction";
import Result from "./pages/Result";
import Select from "./pages/Select";
import Demographic from "./pages/Demographic";
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import ScanPage from "./pages/ScanPage";

library.add(fab, faCheckSquare, faCoffee)



function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              
            </>
          }
        />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/result" element={<Result />} /> {/* New route for the result page */}
        <Route path="/select" element={<Select />} />
        <Route path="/demographic" element={<Demographic />} /> {/* Optional */}
        <Route path="/scan" element={<ScanPage />} />


        
      </Routes>
    </>
  );
}

export default App;
