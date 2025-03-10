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
    { title: "Home", link: "#Home" },
    { title: "Aplikasi", link: "#Aplikasi" },
    { title: "Keuntungan", link: "#Keuntungan" },
    { title: "Kegiatan & Berita", link: "#Kegiatan" },
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
      <div className="px-4 lg:px-[100px] xl:px-[218px] fixed z-40 w-full pt-4">
        <div
          className={`px-4 md:px-[30px] h-20 w-full rounded-2xl flex items-center justify-between bg-white shadow  transition-all duration-300 ${scrolled ? "shadow-md bg-opacity-60 backdrop-blur-xl hover:bg-opacity-100" : "shadow"}`}
        >
          <div className="font-bold text-sm md:text-3xl text-[#4479BC]">
            <Link href="#Home" className="cursor-pointer flex items-center text-[14px] gap-2 whitespace-nowrap">
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
                className="text-[#6A778B] rounded-md px-3 text-sm hover:text-[#4479BC] hover:underline hover:underline-offset-[32px] hover:decoration-2 font-medium whitespace-nowrap cursor-pointer"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="hidden md:block text-xl md:text-3xl font-bold text-white bg-[#4479BC] px-4 rounded-md">
            <Link
              href={"https://api.whatsapp.com/send?phone=6281932696996&text=Halo,%20saya%20tertarik%20dengan%20produk%20Anda!"}
              className="cursor-pointer flex items-center text-[14px] gap-2 whitespace-nowrap"
              target="_blank"
            >
              <FiPhone className="w-[20px] h-[20px]" />
              Hubungi Kami
            </Link>
          </div>

          <button
            onClick={() => setNavOpen(true)}
            className="block md:hidden text-[#202020] p-2"
            aria-label="Open navigation menu"
          >
            <FaBars size={22} />
          </button>
        </div>
      </div>

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
