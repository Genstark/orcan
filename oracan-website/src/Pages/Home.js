import React, { useEffect } from "react";
import Navigation from "./component/Navigation";
import Header from "./component/Header";
import Services from "./component/Services";
import AOS from "aos";
import "aos/dist/aos.css";
import { TabTitle } from "./DynamicTitle";
import { Element } from "react-scroll";
import Brush from "../assets/brush.png";
import Recycle from "../assets/recycle.png";
import Appointment from "../assets/appointment.png";
import About from "./component/About";
import Team from "./component/Team";
import Plan from "./component/Plan";
import Contact from "./component/Contact";
import Footer from "./component/Footer";
import Insights from "../assets/insights.png";
import Recommendations from "../assets/recommendation.png";
import Profile from "../assets/profile.png";
import "./component/style.css";

function Home() {
  TabTitle("Oracan");
  const data = [
    {
      title: "Oral Insights",
      description:
        "The feature generates a comprehensive report evaluating the user's oral health, utilizing input provided by the user.",
      image: Insights,
    },
    {
      title: "Recommendations",
      description:
        "Offering quick tips and suggestions aimed at enhancing oral hygiene practices.",
      image: Recommendations,
    },
    {
      title: "Custom Profile",
      description:
        "A dedicated section where users can access previous insights, including general information and biometric data related to oral health.",
      image: Profile,
    },
  ];

  useEffect(() => {
    AOS.init({
      once: false,
    });
    if (window) {
      window.addEventListener(
        "wheel",
        () => {
          AOS.refresh();
        },
        false
      );
    }
    AOS.refresh();
  }, []);
  return (
    <>
      <Navigation />
      <div className="container-fluid bg-gradient">
        <Element name="home">
          <Header />
        </Element>
        <Element name="services">
          <div className="row d-flex justify-content-around bg-white p-3">
            {data.map((item, index) => (
              <Services
                key={index}
                title={item.title}
                description={item.description}
                imgSrc={item.image}
              />
            ))}
          </div>
        </Element>

        <Element name="about">
          <About />
        </Element>
        <Team />
        <br />
        <br />
        {/* <Element name="pricing">
          <Plan />
        </Element> */}
        <Element name="contact">
          <Contact />
        </Element>
        <Footer />
      </div>
    </>
  );
}

export default Home;
