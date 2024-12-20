/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const HeaderV2: React.FC = () => {
    const [scrolled, setScrolled] = useState<boolean>(false);

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
                <Link
                    className="flex items-center gap-2 text-[#4479BC]"
                    href={"/"}
                >

                    <FaArrowLeft />
                    <span>Kembali</span>
                </Link>
            </header>
        </>
    );
};

export default HeaderV2;
