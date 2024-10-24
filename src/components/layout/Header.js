import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImage from "./assets/logo.png";
import "./Header.css";
import pages from "../../utils/pages";

import gsap from "gsap";

const navLinks = Array.from(pages.values()).filter((page) => page.anchorable);

const Header = () => {
  const { pathname } = useLocation();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  // const [isHeaderUp, setIsHeaderUp] = useState(false);

  const container = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo("header", { top: "-200px" }, { top: "0px", duration: 2 });
      return () => {
        // my custom cleanup code. Called when ctx.revert() is triggered.
      };
    }, container);

    ctx.clear();
  });

  return (
    <div ref={container}>
      <header className="headerr">
        <nav className="container grid nav-bar">
          <Link className="nav-bar-logo" to={pages.get("home").path}>
            <img src={logoImage} alt="Little Lemon logo" />
          </Link>
          <button
            className="nav-bar-hamburger"
            type="button"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
          >
            {isNavExpanded ? (
              <FontAwesomeIcon icon={faXmark} size="2x" />
            ) : (
              <FontAwesomeIcon icon={faBars} size="2x" />
            )}
          </button>
          <ul
            className={
              isNavExpanded ? "nav-bar-links expanded" : "nav-bar-links"
            }
            onClick={() => setIsNavExpanded(!isNavExpanded)}
          >
            {navLinks.map((navLink, index) => (
              <li key={index}>
                <Link
                  className={
                    pathname === navLink.path ? "current-location" : ""
                  }
                  to={navLink.path}
                >
                  {navLink.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
