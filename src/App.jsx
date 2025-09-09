// import { useState } from "react";
import "./App.css";
import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import ServicesPage from "./pages/services/ServicesPage";
import "./utils/UtilityStyles.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainContainer from "./components/mainContainer/MainContainer";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Layout>
        <Header />
        <MainContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<ServicesPage />} />
          </Routes>
        </MainContainer>
        <Footer />
      </Layout>
    </>
  );
}

export default App;
