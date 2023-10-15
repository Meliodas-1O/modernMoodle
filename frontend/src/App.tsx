import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Administration from "./pages/Administration";
import Home from "./pages/Home";

function App() {
     return (
          <div className="App">
               <Navbar />
               <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Administration />} />
               </Routes>
          </div>
     );
}

export default App;
