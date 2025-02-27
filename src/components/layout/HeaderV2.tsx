"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

interface HeaderV2Props {
    title: string;
}

const HeaderV2: React.FC<HeaderV2Props> = ({ title }) => {
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
        <div className="px-4 md:px-[90px] xl:px-[218px] fixed z-40 w-full pt-4">
            <div
                className={`px-4 md:px-[30px] h-20 w-full rounded-2xl flex items-center justify-between bg-white shadow  transition-all duration-300 ${scrolled ? "shadow-md bg-opacity-60 backdrop-blur-xl hover:bg-opacity-100" : "shadow"}`}
            >
                <Link
                    href={title ? "/kegiatan" : "/"}
                    className={`flex items-center gap-1 line-clamp-1 ${title ? "text-[#BCBCBC]" : "text-[#4479BC] font-semibold"}`}
                >
                    <FaArrowLeft />
                    <span>Kembali</span>
                    <div className="text-[#4479BC] font-semibold line-clamp-1">{title}</div>
                </Link>
                {/* Display the title */}
            </div>
        </div>
    );
};

export default HeaderV2;
