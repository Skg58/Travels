"use client"
import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import Typed from 'typed.js';
import mahjid from '@/public/images/mahjid.jpg'
import taj from '@/public/images/5.avif'


const TypedCity = () => {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Delhi...", "Jaipur...", "Mumbai...", "Ladakh...", "Shimla...", "Manali...", "Agra...", "Goa..."],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      showCursor: false
    });

    return () => typed.destroy();
  }, []);

  return <span ref={el} />;
};


const images = [
  '/1.avif',
  '/2.avif',
  '/3.avif',
  '/4.avif',
  taj,
];

export default function Home() {
  const [current, setCurrent] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);
  const [isHover1, setisHover1] = useState(false);
  const [isHover2, setisHover2] = useState(false);

  const handleHover1 = () => {
    setisHover1(true);
  };
  const handleHover2 = () => {
    setisHover2(true);
  };

  // Auto center the middle image when not hovered
  useEffect(() => {
    if (!isHovered) {
      setCurrent(Math.floor(images.length / 2));
      startAutoScroll();
    }
    return stopAutoScroll;
  }, [isHovered]);

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 100000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseEnter = (index) => {
    stopAutoScroll();
    setIsHovered(true);
    setCurrent(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="h-[170vh] md:h-[200vh] mb-20">
      <div >
        <div className='relative mx-auto w-[75vw] h-[30vh] md:h-[70vh] my-8 ' >
           <Image
            src={mahjid}
            alt="mahjid"
            fill ={true}
            priority ={true}
            quality={80}
            sizes="75vw"
            placeholder="blur"
            className="object-cover object-center rounded-4xl z-0"
          />
          <div className='absolute z-10 top-[-1vh]  ml-[4vw] md:ml-[9.2vw]' >
            <div className=" rounded-lg  p-8   ">
              <div className="text-gray-900 text-4xl md:text-7xl font-extrabold tracking-wide uppercase drop-shadow-lg mb-4 flex justify-center items-center flex-col md:flex-row gap-1 relative max-w-[50vw] md:max-w-screen -mr-[2] ">
                <div className='mr-[1vw] '> DISCOVER&nbsp; </div>
                <div className='min-w-[230px]   md:min-w-[500px] text-4xl md:text-7xl ml-[15vw] md:ml-0' > {TypedCity()}</div>
              </div>
            </div>
          </div>


          <div className="md:flex hidden flex-col items-center p-4 w-[28%] absolute -bottom-20 left-[36.1%] bg-[#f9fafb] rounded-2xl shadow-xl border border-gray-200 backdrop-blur-lg">
            <span className="mb-1 inline-block bg-gradient-to-r bg-gray-700 text-white text-xs font-bold px-3 py-0.5 rounded-full shadow">
              Limited Offer
            </span>
            <p className="text-gray-800 font-semibold mb-2 text-base tracking-wide text-center">
              Plan Ahead & Save More
            </p>
            <p className="text-sm text-gray-600 text-center mb-3">
              Book early and enjoy exclusive discounts across India.
            </p>
            <Link
              href="/Booking"
              className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-white cursor-pointer bg-gray-800 hover:bg-gray-900 transition font-semibold text-base"
            >
              <span className="flex items-center justify-center">
                <lord-icon
                  src="https://cdn.lordicon.com/zhtsepgu.json"
                  trigger="hover"
                  colors="primary:#ffffff"
                  style={{ width: "20px", height: "20px" }}
                ></lord-icon>
              </span>
              <span >Book Now</span>
            </Link>
          </div>
        </div>
      </div>


      <div className=" bg-greeng-400 mt-5  md:mt-30 max-w-[75vw]  flex flex-col md:flex-row justify-center items-center gap-0.5 md:gap-10 mx-auto  ">
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-[75vw] md:w-[20vw]  max-w-md flex flex-col items-center  border border-gray-200">
          <h2 className="text-2xl font-extrabold mb-2 text-gray-900 tracking-wide text-center">
            Special Package Offers
          </h2>
          <p className="text-gray-600 mb-2 text-sm text-center">
            Explore our exclusive travel packages designed to give you the best experience in Delhi.
          </p>
          <ul className="hidden md:block list-disc pl-6 space-y-1 text-gray-800 self-start">
            <li>Historical Tours</li>
            <li>Cultural Experiences</li>
            <li>Food and Culinary Tours</li>
            <li>Adventure Activities</li>
          </ul>
          <Link href={"/Packages"}>
            <button className="mt-3 px-8 py-3 cursor-pointer  bg-gray-600 hover:bg-gray-800 text-white rounded-xl shadow-lg hover:from-indigo-600 hover:to-purple-600 transition">
              View Packages
            </button>
          </Link>
        </div>

        <div className=" hidden  md:flex justify-center items-center flex-col gap-8 mt-[6vh]">
          <div className='relative   shadow-lg rounded-xl w-[20vw] hover:border-2 border-gray-500' >
            <div className=" py-2 shadow-lg rounded-xl w-[10vw] z-0 " onMouseEnter={handleHover1} onMouseLeave={() => setisHover1(false)} >
              <div className="flex flex-col items-start justify-center  bg-white  max-w-md mx-auto ">
                <div className="text-center ">
                  <div className="text-2xl font-bold ml-2 ">India Gate</div>
                  <p className="text-gray-500">© Delhi City</p>
                </div>
                <Link href={"/Booking"} > <button className="px-2 py-0.5 ml-5 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">
                  Book Now
                </button></Link>
                <div className={`absolute top-0 left-0 z-20 w-[20vw] transition-all ease-in-out duration-[600ms] ${isHover1 && 'translate-x-[9.09vw]'
                  }`}>
                  <Image src="/indiagate.avif" alt="indiagate Logo" width={165} height={165} className='rounded-md cursor-pointer' />
                </div>
              </div>
            </div>

          </div>
          <div className='relative my-7  bg-white  shadow-lg rounded-xl w-[20vw] hover:border-2 border-gray-500' >
            <div className=" py-2 shadow-lg rounded-xl w-[10vw] z-0 hover:handleHover" onMouseEnter={handleHover2} onMouseLeave={() => setisHover2(false)} >
              <div className="flex flex-col items-start justify-center  bg-white  max-w-md mx-auto ">
                <div className="text-center ">
                  <div className="text-2xl font-bold ml-4 ">Red Fort</div>
                  <p className="text-gray-500 ml-3">© Delhi City</p>
                </div>

                <Link href={"/Booking"} > <button className="px-2 py-0.5 ml-5 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">
                  Book Now
                </button></Link>
                <div className={`absolute top-0 left-0 z-20 w-[16vw] transition-all ease-in-out duration-[600ms] ${isHover2 && 'translate-x-[10.06vw]'
                  }`}>
                  <Image src="/3.avif" alt="indiagate Logo" width={150} height={150} className='rounded-md cursor-pointer' />
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className=" hidden md:block relative w-[60vw]  md:w-[20vw] h-[50vh] md:h-[47vh]  shadow-2xl  ">
          <Image src="/qb.avif" alt="indiagate Logo" width={300} height={500} className='rounded-2xl h-[47vh] w-[20vw] cursor-pointer shadow-2xl' />
          <div className=" absolute  w-[100%] h-[125%] top-0  text-black opacity-0 hover:opacity-90    transition-all ease-in-out duration-[400ms]">
            <div className=" absolute  w-[15vw]  bottom-22.5 left-[0.25vw]  bg-white py-2 flex flex-col  justify-center items-center rounded-full ">
              <div className="text-xl">Qutub Minar </div>
              <div className="">★★★★★</div>
              <Link href={"/Booking"} className='underline text-blue-800 hover:text-blue-900'> Book Now</Link>
            </div>
          </div>
          <div className="absolute right-3 top-2 text-md bg-white px-3 py-1 rounded-full flex justify-center items-center gap-1">
            <span><Image src="/loc.png" width={18} height={18} alt="loc" /></span>
            <span>Delhi</span></div>
        </div>
        <div className=" hidden md:block relative  w-[20vw] h-[47vh]  shadow-2xl  ">
          <Image src="/lotus.avif" alt="indiagate Logo" width={300} height={500} className='rounded-2xl h-[47vh] w-[20vw] cursor-pointer shadow-2xl' />
          <div className=" absolute  w-[100%] h-[125%] top-0  text-black opacity-0 hover:opacity-90    transition-all ease-in-out duration-[400ms]">
            <div className=" absolute  w-[15vw]  bottom-22.5 left-[0.25vw]   bg-white py-2 flex flex-col  justify-center items-center rounded-full ">
              <div className="text-xl">Lotus Temple </div>
              <div className="">★★★★</div>
              <Link href={"/Booking"} className='underline text-blue-800 hover:text-blue-900'> Book Now</Link>
            </div>
          </div>
          <div className="absolute right-3 top-2 text-md bg-white px-3 py-1 rounded-full flex justify-center items-center gap-1">
            <span><Image src="/loc.png" width={18} height={18} alt="loc" /></span>
            <span>Delhi</span></div>
        </div>

      </div>


      {/* Responsive Part Start */}
      <div className=' md:hidden flex flex-col justify-center items-center gap-20 '>
        <div className='  w-[70vw]  h-[30vh] mx-auto my-10 bg-ambeur-800 shadow-2xl rounded-2xl'>
          <div > <Image src="/qb.avif" alt="Qutub Minar" width={100} height={100} className='rounded-2xl h-[40vh] w-[70vh]' /> </div>
          <div className='flex justify-center items-center gap-2'>
            <div className='flex flex-col justify-center items-center'>
              <div className="text-xl">Qutub Minar </div>
              <div className="">★★★★★</div>
            </div>
            <button className='px-2 py-1 mt-3 bg-black rounded-full'> <Link href={"/Booking"} className='  underline text-white hover:text-blue-900'> Book Now</Link></button>
          </div>
        </div>
        <div className='  w-[70vw] h-[30vh] mx-auto my-10 bg-ambeur-800 shadow-2xl rounded-2xl'>
          <div  ><Image src="/lotus.avif" alt="Lotus Temple" width={100} height={100} className='rounded-2xl h-[40vh] w-[70vh]' /></div>

          <div className='flex justify-center items-center gap-2'>
            <div className='flex flex-col justify-center items-center'>
              <div className="text-xl">Lotus Temple </div>
              <div className="">★★★★</div>
            </div>
            <button className='px-2 py-1 mt-3 bg-black rounded-full'> <Link href={"/Booking"} className='  underline text-white hover:text-blue-900'> Book Now</Link></button>
          </div>
        </div>
      </div>
      {/* Responsive Part End */}

      {/* Cool  image Effect*/}
      <div className="w-full hidden md:flex flex-col items-center justify-center py-5  px-5 my-18 ">
        <div className="relative w-[40vw] md:w-[75vw] h-[400px] flex items-center justify-center overflow-hidden ">
          {images.map((src, index) => {
            const position = index - current;
            let translateX = position * 208;
            let scale = 0.8;
            let zIndex = 10 - Math.abs(position);

            // Opacity decreases as the image is farther from the center
            let opacity = Math.max(0.2, 1 - Math.abs(position) * 0.25) + 0.25;

            if (position === 0) {
              scale = 1;
              opacity = 1;
              zIndex = 50;
            }

            return (
              <Image
                key={index}
                src={src}
                width={400}
                height={100}
                alt={`Image ${index+1}`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className="absolute rounded-xl shadow-xl cursor-pointer transition-all duration-500 ease-in-out"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  width: '400px',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            );
          })}
        </div>

        <div className="mt-6 flex gap-2 ">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-1000 ${current === index ? 'bg-gray-800' : 'bg-gray-400'
                }`}
            ></button>
          ))}
        </div>
      </div>

    </div>
  );
}
