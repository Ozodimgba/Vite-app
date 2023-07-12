import React, { useState, useEffect } from 'react';

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

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
    </div>
  );
};

export default Carousel;


