import "./Nav.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScreenSize } from "../../hooks/useScreenSize";
import { IoMenu } from "react-icons/io5";

const Nav = () => {
  const isMobile = useScreenSize(768);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <>
      {isMobile ? (
        <>
          {/* Hamburger Button */}
          <button
            className="btn"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <IoMenu className="icon" />
            {/* <span className="bar"></span> */}
            {/* <span className="bar"></span> */}
            {/* <span className="bar"></span> */}
          </button>
          {/* Mobile dropdown */}
          {menuOpen && (
            <nav>
              <ul
                role="list"
                style={
                  {
                    /* display: "flex", listStyle: "none", gap: "20px" */
                  }
                }
              >
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      ) : (
        <nav className="p-sm">
          <ul
            role="list"
            style={{ display: "flex", listStyle: "none", gap: "20px" }}
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Nav;
