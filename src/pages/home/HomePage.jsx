import Carousel from "../../components/carousel/Carousel";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="container">
      <h1>Roofing & Remodeling, Perfected.</h1>
      <p>
        Protect your home with professional roofing and elevate your living
        spaces with expert remodeling—all from one trusted team.
      </p>
      <div>{/* <Carousel /> */}</div>
      <button className="btn btn-primary" href="/services">
        Request a Free Estimate
      </button>
    </div>
  );
};

export default HomePage;
