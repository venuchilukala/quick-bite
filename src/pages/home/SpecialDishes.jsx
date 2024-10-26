import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from "../../components/Cards";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const SimpleNextArrow = (props) => {
  const { className, style, onclick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onclick}
    >
      Next
    </div>
  );
};

const SimplePrevArrow = (props) => {
  const { className, style, onclick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onclick}
    >
      Back
    </div>
  );
};

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);

  const slider = React.useRef(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://quick-bite-server-1.onrender.com/menu");
      const data = await response.json();
      const specials = data.filter((item) => item.category === "main course");
      setRecipes(specials);
    })();
  }, []);

  //settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SimpleNextArrow />,
    prevArrow: <SimplePrevArrow />,
  };

  return (
    <div className="section-container my-20 relative">
      <div className="text-left">
        <p className="subtitle">Special Dishes</p>
        <h2 className="title md:w-[520px]">Standout Dishes From Our Menu</h2>
      </div>
      {/* Arrows to slide */}
      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button
          onClick={() => {
            slider?.current?.slickPrev();
          }}
          className="btn p-2 rounded-full ml-5"
        >
          <FaAngleLeft className="h-8 w-8 p-1" />
        </button>
        <button
          onClick={() => {
            slider?.current?.slickNext();
          }}
          className="btn p-2 rounded-full ml-5 bg-green"
        >
          <FaAngleRight className="h-8 w-8 p-1 text-white" />
        </button>
      </div>
      <div>
        <Slider
          ref={slider}
          {...settings}
          className="overflow-hidden mt-5 space-x-5"
        >
          {recipes.map((item, i) => (
            
              <Cards key={i} item={item} />
          
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SpecialDishes;
