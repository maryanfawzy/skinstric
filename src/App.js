import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
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
