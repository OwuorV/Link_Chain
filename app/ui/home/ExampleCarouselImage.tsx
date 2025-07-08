import React from "react";

interface ExampleCarouselImageProps {
  text: string;
  src: string;
  alt: string;
}

const ExampleCarouselImage = ({
  src,
  alt,
  text,
}: ExampleCarouselImageProps) => {
  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        backgroundColor: "#777",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "10px",
        }}
      >
        {text}
      </div>
    </div>
  );
};
export default ExampleCarouselImage;
