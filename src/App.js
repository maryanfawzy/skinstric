import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Introduction from "./pages/Introduction";
import Result from "./pages/Result";
import Select from "./pages/Select";
import Demographic from "./pages/Demographic";



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

        
      </Routes>
    </>
  );
}

export default App;
