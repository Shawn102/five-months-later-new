import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const insideContainer = useRef(0);
  const mainContainer = useRef(0);
  useEffect(() => {
    let HeightOfInsideList =
      insideContainer.current.getBoundingClientRect().height;
    if (isOpen) {
      mainContainer.current.style.height = `${HeightOfInsideList}px`;
    } else {
      mainContainer.current.style.height = `0px`;
    }
  }, [isOpen]);
  return (
    <nav>
      <div className="responsive-nav">
        <h1>3M</h1>
        <button onClick={() => setIsOpen((previous) => !previous)}>
          <FaBars />
        </button>
      </div>
      <div ref={mainContainer} className="nav-links-container">
        <ul ref={insideContainer}>
        <Link to="/" className="links">
          <li>
            Todos
          </li>
          </Link>
          <Link to="/add" className="links">
          <li>
            Add todos
          </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
