// components/FeedbackCarousel.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Feedback {
  occupation: string;
  quote: string;
  author: string;
  rating: number;
  image: string;
}

interface FeedbackCarouselProps {
  feedbacks: Feedback[];
  interval?: number;
}

const FeedbackCarousel: React.FC<FeedbackCarouselProps> = ({
  feedbacks,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
    }, interval);

    return () => clearInterval(timer);
  }, [feedbacks, interval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto p-4 bg-white rounded shadow-md">
      <div className="flex flex-col transition-transform duration-500">
        {feedbacks.map((feedback, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 ${
              currentIndex === index ? "block" : "hidden"
            }`}
          >
            <div className="flex gap-1">
              {Array(feedback.rating)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current text-yellow-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.5 3 1.5-6.5L2 8l6.5-1L10 2l1.5 5 6.5 1-4 4.5 1.5 6.5z" />
                  </svg>
                ))}
            </div>
            <p className="text-lg italic">"{feedback.quote}"</p>
            <div className="flex gap-3 items-center">
              <div>
                <Image
                  src={feedback.image}
                  alt={feedback.author}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col gap--2 justify-center">
                <p className="text-sm font-bold">{feedback.author}</p>
                <p className="text-sm font-light text-gray-600">
                  {feedback.occupation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-full gap-3 h-[50px] mt-4">
        {feedbacks.map((_, index) => (
          <button
            key={index}
            className={`w-8 h-8  ${
              currentIndex === index
                ? "bg-blue-500 rounded-[50px]"
                : "bg-gray-400 rounded-[50px]"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedbackCarousel;
