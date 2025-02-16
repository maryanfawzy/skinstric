import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Introduction from "./pages/Introduction";


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
        
      </Routes>
    </>
  );
}

export default App;
