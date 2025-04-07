import { useState } from "react";

import air from "../assets/air.webp";
import road from "../assets/road.png";
import water from "../assets/water.avif";
import airVideo from "../assets/air.mp4";
import roadVideo from "../assets/van.mp4";
import seaVideo from "../assets/ship.mp4";

const freightData = [
  {
    title: "Air Freight",
    img: air,
    video: airVideo,
    desc: "Air Freight is another term for air cargo, the shipment of goods through an air carrier.",
  },
  {
    title: "Road Freight",
    img: road,
    video: roadVideo,
    desc: "Road freight is the physical process of transporting cargo by road using motor vehicles.",
  },
  {
    title: "Sea Freight",
    img: water,
    video: seaVideo,
    desc: "Sea Freight is a method of transporting large amounts of goods using carrier ships.",
  },
];
export default function FreightSection() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
  
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12 sm:gap-20 border-gray-500">
        {freightData.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden border-b-[1px] pb-6 border-gray-600 "
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index && (
              <video
                src={item.video}
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            )}
            <div
              className={`relative flex flex-col sm:flex-row items-center justify-between gap-6 p-6 transition-all duration-300 `}>
              <h1 className="text-3xl sm:text-4xl text-center sm:text-left">{item.title}</h1>
  
              <div className={` h-32 sm:h-44 w-32 sm:w-80 overflow-hidden rounded-l-full rounded-r-full  ${
                hoveredIndex === index ? "opacity-0 invisible" : "opacity-100 visible"
              }`}>
                <img src={item.img} className="h-full w-full object-cover" />
              </div>
  
              <p className="text-gray-300 text-center sm:text-left max-w-sm  ">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }