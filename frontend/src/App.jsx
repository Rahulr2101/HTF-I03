import { Navbar } from "./components/Navbar";
import container from "./assets/container.jpeg";
import CircularText from "./components/ui/circularText";
import ScrollVelocity from "./components/ui/scrollVelocity";
import road from "./assets/road.png";
import { ArrowUpRight, Sparkle, Boxes,Caravan,TrainFront } from "lucide-react";
import air from "./assets/air.webp";
import { Mobile } from "./components/ui/mobile";
import water from "./assets/water.avif";
import { Button } from "./components/ui/button";
import WorldText from "./components/ui/WorldText";
import Footer from "./components/footer";
import FreightSection from "./components/freightData";

export default function Index() {
  return (
    <div className="space-y-16 sm:space-y-32 overflow-x-hidden ">
      <Navbar />
      
      <div className="flex flex-col lg:flex-row justify-between items-center container mx-auto px-4 sm:px-6 lg:px-12">
        <h1 className="text-4xl sm:text-4xl lg:text-8xl font-semibold text-center lg:text-left">
          <span>More Than Just </span>
          <Sparkle size={40} sm:size={50} lg:size={62} fill="currentColor" className="text-blue-600 inline-block" />
          <span className="block">
            A <span className="text-blue-600">Logistic</span> Shipment
          </span>
        </h1>
        <h1 className="text-lg sm:text-xl font-light max-w-sm text-gray-600 text-center lg:text-left mt-4 lg:mt-0">
          ShipWell will deliver your package quickly, safely than any other shipping agency
        </h1>
      </div>
      
      <div className="relative">
        <div className="absolute right-0 mr-10 sm:mr-20 -top-10 sm:-top-20 p-2 bg-white rounded-full sm:block">
          <div className="h-24 sm:h-48 w-24 sm:w-48 flex items-center justify-center rounded-full bg-grayBlack">
            <CircularText
              text="Get Started - Get Started -"
              onHover="speedUp"
              spinDuration={20}
              className="text-white font-light max-h-24 lg:max-h-full "
            />
            <ArrowUpRight className="absolute text-white" size={30} sm:size={40} />
          </div>
        </div>
        
        <img className="w-full h-auto object-cover" src={container} alt="Container ship" />

        <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-grayBlack overflow-hidden">
          <div className="flex items-center justify-center h-20 sm:h-36">
            <ScrollVelocity
              texts={[`TRACKING • SHIPPING • DELIVERY •`]}
              velocity={20}
              className="text-white"
            />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12 sm:gap-20">
        <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-6">
          <h1 className="text-3xl sm:text-6xl font-semibold">
            Deliver Your <span className="text-blue-600">Logistic</span> Safely and Quickly
          </h1>
          <h1 className="text-gray-600 text-lg sm:text-xl max-w-sm">
            This is the reason why you should use our services instead of using other shipping agency
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-offwhite flex flex-col items-center gap-5 p-6 rounded-lg shadow-md">
              <div className="space-y-6">
                <div className="bg-blue-200 rounded-lg w-min p-2 mx-auto">
                  
                  <Boxes className="text-blue-600" size={40} />
                </div>
                <h1 className="text-2xl font-semibold">Lorem ipsum dolor sit amet</h1>
              </div>
              <h1 className="text-gray-600 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam architecto, facere quibusdam beatae omnis.
              </h1>
            </div>
            <div className="bg-offwhite flex flex-col items-center gap-5 p-6 rounded-lg shadow-md">
              <div className="space-y-6">
                <div className="bg-red-200 rounded-lg w-min p-2 mx-auto">
              
                  <Caravan className="text-red-600" size={40} />
                </div>
                <h1 className="text-2xl font-semibold">Lorem ipsum dolor sit amet</h1>
              </div>
              <h1 className="text-gray-600 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam architecto, facere quibusdam beatae omnis.
              </h1>
            </div>
            <div className="bg-offwhite flex flex-col items-center gap-5 p-6 rounded-lg shadow-md">
              <div className="space-y-6">
                <div className="bg-green-200 rounded-lg w-min p-2 mx-auto">
                  
                  <TrainFront className="text-green-600" size={40} />
                </div>
                <h1 className="text-2xl font-semibold">Lorem ipsum dolor sit amet</h1>
              </div>
              <h1 className="text-gray-600 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam architecto, facere quibusdam beatae omnis.
              </h1>
            </div>
        </div>
        
      </div>
      
      <div className="bg-grayBlack text-white px-4 sm:px-6 lg:px-12 py-16">
        <div className="container mx-auto flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-6">
            <h1 className="text-4xl sm:text-6xl">
              How do we <span className="text-blue-600">Deliver</span> your Package
            </h1>
            <p className="text-gray-200 max-w-md text-lg">
              ShipWell provides several shipping methods which have their respective advantages, choose the method that suits your packages.
            </p>
          </div>

          <FreightSection/>
        </div>
      </div>
      
      <div className="container mx-auto flex flex-col sm:flex-row items-center gap-8 px-4 sm:px-6 lg:px-12">
        <Mobile className="max-h-[50vh] sm:max-h-[66vh]" />
        <div className="flex flex-col gap-6 text-center sm:text-left">
          <h1 className="text-3xl sm:text-6xl font-medium">Track Your Package in Real Time</h1>
          <p className="text-gray-600 font-light">By using the ShipWell mobile application, you can track your package quickly, easily, and in real time.</p>
          <Button className="w-full sm:w-min text-white font-thin h-10">Learn More →</Button>
        </div>
      </div>
      
      <div className="bg-grayBlack">
        <WorldText/>
        <Footer/>
      </div>
    </div>
  );
}
