/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Team = () => {
    const [teams] = useState([
        {
            nama: "Gerri Arisman",
            jabatan: "Direktur Graha Skrip Infra Prima",
            image: "assets/images/person.png",
            background: "#CFEBD1",
        },
        {
            nama: "Arnando Fajar Sidiq",
            jabatan: "Programmer",
            image: "assets/images/person.png",
            background: "#FFE9BD",
        },
        {
            nama: "Ramadhani Asrofa Kemal",
            jabatan: "Programmer",
            image: "assets/images/person.png",
            background: "#CEE0FA",
        },
        {
            nama: "Hashfi Qaedi Yusman",
            jabatan: "UI/UX Designer",
            image: "assets/images/person.png",
            background: "#E3D6FF",
        },
        {
            nama: "Gerri Arisman",
            jabatan: "Direktur Graha Skrip Infra Prima",
            image: "assets/images/person.png",
            background: "#CFEBD1",
        },
        {
            nama: "Arnando Fajar Sidiq",
            jabatan: "Programmer",
            image: "assets/images/person.png",
            background: "#FFE9BD",
        },
        {
            nama: "Ramadhani Asrofa Kemal",
            jabatan: "Programmer",
            image: "assets/images/person.png",
            background: "#CEE0FA",
        },
        {
            nama: "Hashfi Qaedi Yusman",
            jabatan: "UI/UX Designer",
            image: "assets/images/person.png",
            background: "#E3D6FF",
        },
    ]);

    return (
        <div className="relative min-h-screen px-[215px] bg-[#FAFAFA] flex flex-col py-[70px] items-center justify-center">
            {/* Section Title */}
            <div className="text-center text-[#4479BC] text-[40px] font-bold mb-2">
                Team Graha Skrip Infra Prima
            </div>
            <div className="text-center text-[#42526B] text-[14px] mb-[120px]">
                Unit kami terdiri dari para ahli di bidangnya masing-masing, siap mendukung Anda.
            </div>

            {/* Navigation Arrows */}
            <div className="absolute top-[200px] right-0 left-[820px] flex justify-center gap-4 z-10">
                <button className="swiper-button-prev-custom border-[2px] border-[#4479BC] text-[#4479BC] rounded-full p-2 shadow-md">
                    <FaArrowLeft />
                </button>
                <button className="swiper-button-next-custom border-[2px] border-[#4479BC] text-[#4479BC] rounded-full p-2 shadow-md">
                    <FaArrowRight />
                </button>
            </div>

            {/* Swiper Wrapper */}
            <div className="w-full">
                <Swiper
                    slidesPerView={4} // Default untuk layar besar
                    spaceBetween={20}
                    centeredSlides={false}
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
                        320: { slidesPerView: 1 }, // Untuk layar kecil
                        768: { slidesPerView: 2 }, // Untuk tablet
                        1024: { slidesPerView: 3 }, // Untuk laptop
                        1280: { slidesPerView: 4 }, // Untuk layar besar
                    }}
                    modules={[Autoplay, Navigation]}
                >
                    {teams.map((team, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="flex flex-col items-center justify-center  h-fit border"

                            >
                                {/* Team Image */}
                                <div style={{ backgroundColor: team.background }}>
                                    <img
                                        src={team.image}
                                        alt={team.nama}
                                        className="h-full w-full object-cover mb-4"
                                    />
                                </div>
                                {/* Team Name and Job Title */}
                                <div className="text-start">
                                    <h3 className="text-lg font-semibold text-[#2C3E50]">
                                        {team.nama}
                                    </h3>
                                    <p className="text-sm text-[#7F8C8D]">{team.jabatan}</p>
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
