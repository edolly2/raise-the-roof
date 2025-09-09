import { useState } from "react";
import Wrapper from "../../layout/Wrapper";
import Nav from "../navigation/Nav";
import SiteBrand from "../siteBrand/SiteBrand";
import "./Header.css";
import "../../utils/UtilityStyles.css";

const Header = () => {
  // TODO:Call to action

  const [hovered, setHovered] = useState(false);

  return (
    <header>
      <Wrapper className="p-sm flex flex-row space-between align-center">
        <SiteBrand />
        <button
          className="btn header-btn"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? "(402) 218-1489" : "CALL US NOW!"}
        </button>
      </Wrapper>
      <Nav />
    </header>
  );
};

export default Header;
