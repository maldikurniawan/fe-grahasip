"use client";
import React, { Fragment, useState, useRef, JSX } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import {
    MdArticle,
    MdKeyboardArrowRight,
    MdPeople,
    MdSpaceDashboard,
} from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSolidFaceMask } from "react-icons/bi";

interface MenuItem {
    title: string;
    link: string;
    icon: JSX.Element;
    subMenu: MenuItem[];
}

interface SidebarProps {
    sideOpen: boolean;
    setSideOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sideOpen, setSideOpen }) => {
    const initNav: Record<number, boolean> = {};
    const [navopen, setNavopen] = useState(initNav);
    const pathname = usePathname();
    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref, () => setNavopen(initNav));

    const menuItems: MenuItem[] = [
        {
            title: "Dashboard",
            link: "/dashboard",
            icon: <MdSpaceDashboard />,
            subMenu: [],
        },
        {
            title: "Artikel",
            link: "/artikel",
            icon: <MdArticle />,
            subMenu: [],
        },
        {
            title: "Team",
            link: "/team",
            icon: <MdPeople />,
            subMenu: [],
        },
        {
            title: "Pengunjung",
            link: "/riwayat-kunjungan",
            icon: <BiSolidFaceMask />,
            subMenu: [],
        },
    ];

    const toggleNavOpen = (index: number) => {
        setNavopen((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <Fragment>
            <div
                onClick={() => setSideOpen(!sideOpen)}
                className={`z-50 fixed w-screen h-screen md:hidden ${sideOpen ? "" : "hidden"
                    }`}
            ></div>

            <div
                ref={ref}
                key={sideOpen ? "open" : "closed"}
                className={`z-50 fixed md:relative h-screen flex flex-col bg-[#0F172A] shadow-lg text-white transition-transform duration-300 ease-in-out ${sideOpen
                        ? "w-[18rem] translate-x-0"
                        : "w-14 -translate-x-full md:translate-x-0"
                    }`}
            >
                <div className="w-full flex justify-center my-4">
                    <img
                        src="/assets/images/gsip-logo.png"
                        alt="logo"
                        className="w-[8rem]"
                    />
                </div>

                <div className="px-2 pb-5 text-xl overflow-y-auto max-h-[80vh] hidden-scroll">
                    {menuItems.map((item, index) => (
                        <div key={index}>
                            <div onClick={() => item.subMenu.length > 0 && toggleNavOpen(index)}>
                                {item.link ? (
                                    <Link
                                        href={item.link}
                                        className={`mb-2 flex items-center gap-2 p-2 cursor-pointer text-base rounded-lg ${pathname.startsWith(item.link)
                                                ? "bg-white text-black"
                                                : "hover:bg-gray-100 hover:text-black"
                                            }`}
                                    >
                                        <div>{item.icon}</div>
                                        <div className={`${sideOpen ? "block" : "hidden"}`}>
                                            {item.title}
                                        </div>
                                    </Link>
                                ) : (
                                    <div
                                        className={`mb-2 flex items-center gap-2 p-2 cursor-pointer text-base rounded-lg ${navopen[index]
                                                ? "bg-white text-black"
                                                : "hover:bg-gray-100 hover:text-black"
                                            }`}
                                    >
                                        <div>{item.icon}</div>
                                        <div className={`${sideOpen ? "block" : "hidden"}`}>
                                            {item.title}
                                        </div>
                                        {item.subMenu.length > 0 && (
                                            <MdKeyboardArrowRight
                                                className={`transition-transform ${navopen[index] ? "rotate-90" : ""
                                                    }`}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            {item.subMenu.length > 0 && navopen[index] && (
                                <div className="pl-6">
                                    {item.subMenu.map((subItem, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            href={subItem.link}
                                            className={`mb-2 flex items-center gap-2 p-2 rounded-lg text-sm ${pathname.startsWith(subItem.link)
                                                    ? "bg-gray-300 text-black"
                                                    : "hover:bg-gray-300 hover:text-black"
                                                }`}
                                        >
                                            <div>{subItem.icon}</div>
                                            <div>{subItem.title}</div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {sideOpen && (
                    <div className="text-[8px] text-center flex w-full mt-auto mb-2 items-center justify-center">
                        Copyright &copy; PT. Queen Network Nusantara
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Sidebar;
