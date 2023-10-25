import Layout from "./components/Layout";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Orase from "./pages/Orase";
import Contact from "./pages/Contact";
import About from "./pages/About";
import OraseAll from "./pages/OraseAll";
import Categorie from "./pages/Categorie";

function App() {
  return (
    <div className="flex min-h-[100dvh] flex-col justify-between space-y-4">
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="orase">
            <Route index element={<OraseAll />} />{" "}
            <Route path=":oras" element={<Orase />} />
          </Route>

          <Route path="categorie">
            <Route path=":categorie" element={<Categorie />} />
          </Route>

          <Route path="contact" element={<Contact />} />
          <Route path="despre" element={<About />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
