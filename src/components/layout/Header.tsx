/* eslint-disable @next/next/no-img-element */
"use client";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import Link from "next/link";

type MenuItem = {
  title: string;
  link: string;
};

const Header: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const menu: MenuItem[] = [
    { title: "Home", link: "/" },
    { title: "Aplikasi", link: "/" },
    { title: "Keuntungan", link: "/" },
    { title: "Kegiatan & Berita", link: "/" },
  ];

  useOnClickOutside(ref, () => setNavOpen(false));

  useEffect(() => {
    if (width > 1024) {
      setNavOpen(false);
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY >= 100);
    });
  }, []);

  return (
    <>
      <header
        className={`px-4 md:px-[30px] h-20 mt-4 w-full lg:w-[920px] rounded-2xl flex items-center justify-between bg-white fixed top-10 shadow left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${scrolled ? "shadow-md bg-opacity-60 backdrop-blur-xl hover:bg-opacity-100" : "shadow"}`}
      >
        <div className="font-bold text-sm md:text-3xl text-[#4479BC]">
          <Link href="#Home" scroll={false} className="cursor-pointer flex items-center text-[14px] gap-2 whitespace-nowrap">
            <img
              src="assets/images/logo.png"
              alt="logo"
              className="w-[28px] h-[20px]"
            />
            Graha Skrip Infra Prima
          </Link>
        </div>

        <div className="hidden md:flex items-center">
          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              scroll={false}
              className="text-[#6A778B] rounded-md px-3 text-sm hover:text-[#4479BC] hover:underline hover:underline-offset-[32px] hover:decoration-2 font-medium whitespace-nowrap cursor-pointer"
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="hidden md:block text-xl md:text-3xl font-bold text-white bg-[#4479BC] px-4 rounded-md">
          <div className="cursor-pointer flex items-center text-[14px] gap-2 whitespace-nowrap">
            <FiPhone className="w-[20px] h-[20px]" />
            Hubungi Kami
          </div>
        </div>

        <button
          onClick={() => setNavOpen(true)}
          className="block md:hidden text-[#202020] p-2"
          aria-label="Open navigation menu"
        >
          <FaBars size={22} />
        </button>
      </header>

      {/* Mobile Navigation */}
      <div
        ref={ref}
        style={{ right: navOpen ? "0" : "-300px" }}
        className="fixed z-50 top-0 h-full w-[300px] bg-[#0F172A] bg-opacity-50 backdrop-blur shadow-lg transition-all"
      >
        <div className="flex items-center justify-end text-white p-4">
          <button
            onClick={() => setNavOpen(false)}
            aria-label="Close navigation menu"
          >
            <FaXmark size={22} />
          </button>
        </div>
        <nav className="p-4 space-y-4">
          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              scroll={false}
              className="block px-6 py-2 text-white hover:bg-white/20 font-medium rounded-lg"
              onClick={() => setNavOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
