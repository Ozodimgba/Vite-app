import React, { useState, useEffect } from 'react';

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
     <button className="carousel-control carousel-control-prev" onClick={goToPreviousSlide}>
        Previous
      </button>
      <button className="carousel-control carousel-control-next" onClick={goToNextSlide}>
        Next
      </button>
     </div>
      
    </div>
  );
};

export default Carousel;
