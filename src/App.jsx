import { BrowserRouter, Routes, Route } from "react-router-dom";
import UnicornModule from "../src/layouts/unicorns";
import ProductsModule from "../src/layouts/products";
import Home from "../src/layouts/home/Home";
import Navbar from "../src/components/Navbar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-indigo-100 min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/unicornios/*" element={<UnicornModule />} />
            <Route path="/productos/*" element={<ProductsModule />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
