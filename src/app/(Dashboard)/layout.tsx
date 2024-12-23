"use client";
import React, { Fragment, useEffect, useState } from "react";
import { DashboardHeader, Sidebar } from "@/components";
import { useRouter } from "next/navigation";
// import { TbLoader2 } from "react-icons/tb";

interface LayoutDashboardProps {
    children: React.ReactNode;
}

const LayoutDashboard: React.FC<LayoutDashboardProps> = ({ children }) => {
    const [sideOpen, setSideOpen] = useState<boolean>(false);
    const router = useRouter();
    // const [view, setView] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // const token = localStorage.getItem("access");
            // if (!token) {
            //     router.replace("/auth-system");
            //     return;
            // }
            // setView(true);

            const handleResize = () => {
                setSideOpen(window.innerWidth >= 767);
            };

            handleResize(); // Set initial state
            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, [router]);

    useEffect(() => {
        setSideOpen(window.innerWidth >= 767);
    }, []);

    // if (!view)
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <TbLoader2 size={80} className="text-fuchsia-600 animate-spin" />
    //         </div>
    //     );

    return (
        <Fragment>
            <div className="flex">
                <Sidebar sideOpen={sideOpen} setSideOpen={setSideOpen} />
                <div className="w-full h-screen flex flex-col relative">
                    <DashboardHeader sideOpen={sideOpen} setSideOpen={setSideOpen} />
                    <div className="bg-slate-100 h-full overflow-y-auto custom-scroll px-8 py-4 relative z-[0]">
                        {children}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default LayoutDashboard;
