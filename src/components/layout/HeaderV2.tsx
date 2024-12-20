"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const HeaderV2: React.FC = () => {
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY >= 100);
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`px-4 md:px-[30px] h-20 mt-4 w-full sm:w-[700px] lg:w-[920px] rounded-2xl flex items-center justify-between bg-white fixed top-6 sm:top-10 shadow left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-300 ${scrolled ? "shadow-md bg-opacity-60 backdrop-blur-xl hover:bg-opacity-100" : "shadow"
                }`}
        >
            <Link
                href={"/"}
                className="flex items-center gap-2 text-[#4479BC]"
            >
                <FaArrowLeft />
                <span>Kembali</span>
            </Link>
        </header>
    );
};

export default HeaderV2;
