import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "../lib/useIsMobile.js";

const Footer = () => {
  const containerRef = useRef(null);
    const location = useLocation();
  const showFooter = location.pathname !== "/cart";
  const isMobile = useIsMobile();
  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, []);
  if( !showFooter ){
    return null;
  }
  return (
    <>
    <footer
      ref={containerRef}
      className={`${
        isMobile ? "w-full mx-auto px-4" : "w-[80%] ml-[180px]"
      } bg-white text-black rounded-2xl shadow-lg border border-gray-200 p-6 md:p-4 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300`}
    >
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="Logo" className="w-10 h-10 object-contain" />
        <span className="text-2xl font-bold tracking-tight text-gray-800">
          Task
        </span>
      </div>

      <div className="flex flex-col md:items-end items-center text-sm text-gray-600 space-y-2">
        <div className="text-center md:text-right leading-tight">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium text-gray-800">Cad & Cart</span>. All
            rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Crafted with care for a seamless shopping experience.
          </p>
        </div>

        <div className="flex gap-4 pt-1 text-gray-500 text-sm">
          <a href="#" className="hover:text-gray-800 hover:underline transition">
            Privacy
          </a>
          <a href="#" className="hover:text-gray-800 hover:underline transition">
            Terms
          </a>
          <a href="#" className="hover:text-gray-800 hover:underline transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  <div className="text-sm text-[#F3F4F6] text-center -mt-1 tracking-widest">-</div>
    </>
  );
};

export default Footer;
