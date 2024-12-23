/* eslint-disable @next/next/no-img-element */
"use client";

import React, { Fragment } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { HiMenuAlt2 } from "react-icons/hi";

interface DashboardHeaderProps {
  sideOpen: boolean;
  setSideOpen: (open: boolean) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  sideOpen,
  setSideOpen,
}) => {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      router.push("/auth-system");
    }
  };

  return (
    <Fragment>
      <div className="w-full flex bg-white py-2 justify-between items-center px-3 drop-shadow-sm relative z-10">
        <div
          onClick={() => setSideOpen(!sideOpen)}
          className="p-1 rounded-lg bg-white text-slate-600 text-xl cursor-pointer hover:bg-slate-100 transition-all"
        >
          <HiMenuAlt2 />
        </div>
        <Popover as="div" className="flex relative">
          <PopoverButton>
            <div className="w-10 h-10 rounded-full cursor-pointer overflow-hidden border">
              <img
                className="object-cover h-full w-full"
                src="https://picsum.photos/200"
                alt="user"
              />
            </div>
          </PopoverButton>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <PopoverPanel className="absolute z-[50] w-max min-w-[170px] flex flex-col right-3 top-14 rounded-lg shadow-lg bg-[#0F172A] pt-3 pb-1 px-1 text-white">
              <div className="px-2 pb-2">
                <div className="text-lg font-bold">Admin</div>
              </div>
              <div className="flex flex-col">
                <button
                  onClick={handleLogout}
                  className="text-xs py-2 px-2 rounded-lg text-left hover:bg-white hover:text-slate-600 transition-all"
                >
                  Keluar
                </button>
              </div>
            </PopoverPanel>
          </Transition>
        </Popover>
      </div>
    </Fragment>
  );
};

export default DashboardHeader;
