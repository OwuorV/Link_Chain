"use client";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "@/app/ui/home/ExampleCarouselImage";
import React from "react";
export default function FeedbackCarousel() {
  const carouselItems = [
    {
      src: "/carrots.jpg",
      alt: "Feedback 1",
      caption:
        "The marketplace feature helped me sell my produce directly — no middlemen!",
    },
    {
      src: "/cabbage.avif",
      alt: "Feedback 2",
      caption:
        "Loved the Financing feature — it enables farmers to get additional capital to boost their businesses!",
    },
    {
      src: "/cows.jpg",
      alt: "Feedback 3",
      caption:
        "The youth programs introduced me to agribusiness training and startup grants!",
    },
  ];

  return (
    <Carousel>
      {carouselItems.map((item, index) => (
        <Carousel.Item key={index}>
          <ExampleCarouselImage src={item.src} alt={item.alt} text={""} />
          <Carousel.Caption>
            <h3>{item.caption}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
