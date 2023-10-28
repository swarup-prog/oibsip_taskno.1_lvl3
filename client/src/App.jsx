import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login, Signup, Home } from "./pages";
import { Toaster } from "sonner";
import { Navbar } from "./components";

function App() {
  return (
    <div>
      <Toaster richColors={true} />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
