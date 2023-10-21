import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Administration from "./pages/Administration";
import Home from "./pages/Home";
import CreateTopic from "./pages/CreateTopic";
import Topic from "./pages/Topic";

function App() {
     return (
          <div className="App">
               <Navbar />
               <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/createTopic" element={<CreateTopic />} />
                    <Route path="/admin" element={<Administration />} />
                    <Route path="/topic/:id" element={<Topic />} />
               </Routes>
          </div>
     );
}

export default App;
