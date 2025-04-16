import React, { useState, useEffect } from "react";
import Logo from "../../assets/oracan-logo.svg";
import Playstore from "../../assets/playstore.svg";
import Appstore from "../../assets/appstore.svg";
import "./style.css";
import { Link } from "react-scroll";
import Menu from "../../assets/menu.svg";
import Close from "../../assets/close.svg";
const Navigation = (props) => {
  const [scrolling, setScrolling] = useState(false);
  const [open, updateOpen] = useState(false);
  const [openNav, setopenNav] = useState(true);
  if (openNav) {
    document.body.classList.remove("overflow-hidden");
  } else {
    document.body.classList.add("overflow-hidden");
  }

  useEffect(() => {
    // Function to handle scroll event
    function handleScroll() {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    }

    // Add a scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed-top">
        <div className="p-3 d-flex justify-content-between  white-bg shadow-sm">
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={0} // Offset to adjust the scroll position
            duration={500}
            className="text-decoration-none  nav_txt"
            style={{ cursor: "pointer" }}
          >
            <img src={Logo} alt="" style={{ width: "100%", maxWidth: 200 }} />
          </Link>
          {open ? (
            <img
              src={Close}
              alt=""
              className="menu-icon pointer"
              onClick={() => updateOpen(false)}
            />
          ) : (
            <img
              src={Menu}
              alt=""
              className="menu-icon pointer"
              onClick={() => updateOpen(true)}
            />
          )}
          <div className="options menu-right-size">
            <Link
              to="services"
              spy={true}
              smooth={true}
              offset={-100} // Offset to adjust the scroll position
              duration={500}
              className="text-decoration-none  nav_txt"
              style={{ cursor: "pointer" }}
            >
              <span
                className="m-m eighteen lightblue pointer"
                style={{ color: "#488092" }}
              >
                Features
              </span>
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              offset={0} // Offset to adjust the scroll position
              duration={500}
              className="text-decoration-none  nav_txt"
              style={{ cursor: "pointer" }}
            >
              <span
                className="m-m eighteen lightblue pointer"
                style={{ color: "#488092" }}
              >
                About
              </span>
            </Link>

            {/* <Link
              to="pricing"
              spy={true}
              smooth={true}
              offset={0} // Offset to adjust the scroll position
              duration={500}
              className="text-decoration-none  nav_txt"
              style={{ cursor: "pointer" }}
            >
              <span className="m-m eighteen lightblue pointer">Pricing</span>
            </Link> */}
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={0} // Offset to adjust the scroll position
              duration={500}
              className="text-decoration-none  nav_txt"
              style={{ cursor: "pointer" }}
            >
              <span
                className="m-m eighteen lightblue pointer"
                style={{ color: "#488092" }}
              >
                Contact Us
              </span>
            </Link>
            <img src={Playstore} alt="" className="pointer" height={35} />
            <img src={Appstore} alt="" className="pointer" height={35} />
          </div>
        </div>
        {open ? (
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              to="services"
              spy={true}
              smooth={true}
              offset={-100} // Offset to adjust the scroll position
              duration={500}
              className="text-decoration-none  nav_txt"
              style={{ cursor: "pointer" }}
              onClick={() => updateOpen(false)}
            >
              <span className="m-m twentyeight lightblue pointer mt-5">
                Features
              </span>
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              offset={-100} // Offset to adjust the scroll position
              duration={500}
              className="text-decoration-none  nav_txt"
              style={{ cursor: "pointer" }}
              onClick={() => updateOpen(false)}
            >
              <span className="m-m twentyeight lightblue pointer mt-3">
                About
              </span>
            </Link>
            {/* <Link
              to="pricing"
              spy={true}
              smooth={true}
              offset={-100} // Offset to adjust the scroll position
              duration={500}
              className="text-decoration-none  nav_txt"
              style={{ cursor: "pointer" }}
              onClick={() => updateOpen(false)}
            >
              <span className="m-m twentyeight lightblue pointer mt-3">
                Pricing
              </span>
            </Link> */}
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-100} // Offset to adjust the scroll position
              duration={500}
              className="text-decoration-none  nav_txt"
              style={{ cursor: "pointer" }}
              onClick={() => updateOpen(false)}
            >
              <span className="m-m twentyeight lightblue pointer mt-3">
                Contact Us
              </span>
            </Link>
            <img src={Playstore} alt="" className="pointer mt-3" />
            <img src={Appstore} alt="" className="pointer mt-3 mb-5" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Navigation;
