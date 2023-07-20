import React, { useState, useEffect } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  useEffect(() => {
    const timer = setTimeout(goToNextSlide, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentSlide, slides.length]);

  return (
    <div className="carousel-container bg-[#e3edf7] py-4 w-[300%] relative overflow-hidden">
      <div
        className="carousel flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slide flex-none w-full"
            style={{ width: `${100 / slides.length}%` }}
          >
            {slide}
          </div>
        ))}
      </div>
     
     <div className='flex w-[100%]'>
     <button className="carousel-control carousel-control-prev justify-center" onClick={goToPreviousSlide}>
        <BsFillArrowLeftCircleFill color='1DA1F2' size={19} />
      </button>
      <button className="carousel-control carousel-control-next" onClick={goToNextSlide}>
        <BsFillArrowRightCircleFill color='1DA1F2' size={19} />
      </button>
     </div>
      
    </div>
  );
};

export default Carousel;
