// import { useState } from "react";
import Wrapper from "../../layout/Wrapper";
import Nav from "../navigation/Nav";
import SiteBrand from "../siteBrand/SiteBrand";
import "./Header.css";

const Header = () => {
  // TODO:Call to action

  // const [hovered, setHovered] = useState(false);

  return (
    <header>
      <Wrapper className="p-sm flex justify-between items-center">
        <SiteBrand />
        {/* <button
          className="btn btn-primary" 
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? "(402) 218-1489" : "CALL US NOW!"}
        </button> */}
      </Wrapper>
      <Nav />
    </header>
  );
};

export default Header;
