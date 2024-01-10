"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const Carousel = ({ blogCard }) => {
  console.log(`DATA IN CAROUSEL ${blogCard}`);

  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  // forward on carousel
  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };
  // backward on carousel
  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };
  //fires on  currentIndex change, so the moveNext and movePrev functions
  // math to figure out where to move carousel
  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);
  // sets initial scroll width by checking what the element is showing vs what's offset
  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);
  // should be showing an image in the background but I could not locate in the API
  return (
    <div className="my-12 mx-auto w-1/2">
      <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700">
        Blog Posts
      </h2>
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="hover:bg-blue-900/75 bg-blue-600 w-10 h-full text-center opacity-75 hover:opacity-100 z-10 p-0 m-0 transition-all ease-in-out duration-300"
          >
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:bg-blue-900/75  bg-blue-600 w-10 h-full text-center opacity-75 hover:opacity-100 z-10 p-0 m-0 transition-all ease-in-out duration-300"
          >
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {blogCard.map((r) => {
            return (
              <div
                key={r.identifier}
                className="text-white text-center relative w-64 h-64 snap-start"
              >
                <a
                  href={r.urlMap}
                  className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0 bg-slate-600"
                  style={{ backgroundImage: `url(${r.imageUrl || ""})` }}
                >
                  <h3 className="text-white py-6 px-3 mx-auto text-xl">
                    {r.title}
                  </h3>
                  <Image
                    src={r.imageUrl || ""}
                    alt={r.title}
                    className="w-full aspect-square hidden"
                  />
                </a>
                <a
                  href={r.urlMap}
                  className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
                >
                  <h3 className="text-white py-6 px-3 mx-auto text-xl">
                    {r.title}
                  </h3>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Carousel;
