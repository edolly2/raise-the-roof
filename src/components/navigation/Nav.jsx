import "./Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];
  return (
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
  );
};

export default Nav;
