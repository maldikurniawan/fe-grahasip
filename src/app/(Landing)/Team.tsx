/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useGetData } from "@/actions";
import { API_URL_team } from "@/constants";
import { TbLoader2 } from "react-icons/tb";

type TeamMember = {
    id?: number;
    name: string;
    position: string;
    image?: string;
};

const Team = () => {
    const getTeam = useGetData(API_URL_team, ["team"], true);

    return (
        <div className="relative min-h-screen px-4 sm:px-8 md:px-16 lg:px-32 xl:px-[220px] bg-[#FAFAFA] flex flex-col justify-center py-[60px] sm:py-[80px] md:py-[90px] items-center">
            {/* Section Title */}
            <div className="text-center text-[#4479BC] text-2xl sm:text-3xl md:text-[40px] font-bold mb-4">
                Team Graha Skrip <br className="block sm:hidden" /> Infra Prima
            </div>
            <div className="text-center text-[#42526B] text-sm sm:text-base md:text-[14px] mb-8 md:mb-[100px]">
                Unit kami terdiri dari para ahli di bidangnya masing-masing, siap mendukung Anda.
            </div>

            {/* Navigation Arrows */}
            <div className="relative flex ml-[220px] md:ml-[500px] lg:ml-[770px] gap-4 mb-4 z-10">
                <button className="swiper-button-prev-custom border-[2px] border-[#4479BC] text-[#4479BC] rounded-full p-2 shadow-md">
                    <FaArrowLeft />
                </button>
                <button className="swiper-button-next-custom border-[2px] border-[#4479BC] text-[#4479BC] rounded-full p-2 shadow-md">
                    <FaArrowRight />
                </button>
            </div>

            {/* Swiper Wrapper */}
            <div className="w-full">
                {getTeam.isError && (
                    <div className="flex justify-center text-[#4479BC] font-bold tracking-widest">
                        Tidak terhubung dengan server
                    </div>
                )}
                {getTeam.isLoading && (
                    <div className="flex justify-center">
                        <TbLoader2
                            className="text-[#4479BC] animate-spin"
                            size={50}
                        />
                    </div>
                )}
                <Swiper
                    slidesPerView={4} // Default for large screens
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                    }}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 10 }, // Small screens
                        640: { slidesPerView: 2, spaceBetween: 15 }, // Tablets
                        768: { slidesPerView: 2, spaceBetween: 20 }, // Small laptops
                        1024: { slidesPerView: 3, spaceBetween: 20 }, // Laptops
                        1280: { slidesPerView: 4, spaceBetween: 20 }, // Desktops
                    }}
                    modules={[Autoplay, Navigation]}
                >
                    {getTeam.data &&
                        getTeam.data?.results?.map((team: TeamMember, index: number) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col items-center justify-center rounded-md">
                                    {/* Team Image */}
                                    <div className="w-full rounded-3xl overflow-hidden mb-4 bg-[#E3D6FF]">
                                        <img
                                            src={team.image || "assets/images/person.png"}
                                            alt={team.name}
                                            className="h-full w-full object-cover pt-8"
                                        />
                                    </div>
                                    {/* Team Name and Job Title */}
                                    <div className="text-start whitespace-nowrap w-full">
                                        <h3 className="text-[14px] font-bold text-[#2C3E50]">
                                            {team.name}
                                        </h3>
                                        <p className="text-sm text-[#7F8C8D]">{team.position}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Team;
