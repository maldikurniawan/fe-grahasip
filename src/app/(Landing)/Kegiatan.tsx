/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Kegiatan = () => {
    const [activities] = useState([
        {
            title: "ERPSKRIP ke Batam",
            description:
                "Aenean interdum arcu sit amet nulla lacinia suscipit. Vivamus at laoreet mi. Fusce pulvinar commodo ligula, et egestas dolor. Ut hendrerit blandit neque in tempor.",
            image: "assets/images/kegiatan.png",
            date: "15 Sep, 2024",
        },
        {
            title: "Workshop ReactJS",
            description:
                "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur vel eros eu nulla luctus eleifend.",
            image: "assets/images/kegiatan.png",
            date: "20 Sep, 2024",
        },
        {
            title: "Company Outing",
            description:
                "Praesent in augue non purus tincidunt placerat. Aliquam erat volutpat. Proin nec orci id turpis suscipit vehicula.",
            image: "assets/images/kegiatan.png",
            date: "25 Sep, 2024",
        },
    ]);

    return (
        <div
            className="min-h-screen py-[70px]"
            style={{
                background: "linear-gradient(180deg, #4479BC 0%, #4E89D4 100%)",
            }}
        >
            <div className="text-center text-[#FFFFFF] text-[40px] font-bold">
                Kegiatan & Berita Terbaru
            </div>
            <div className="text-center text-[#B6D6FF] text-[12px]">
                Dapatkan keuntungan maksimal dengan solusi yang disesuaikan dengan
                kebutuhan Anda
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Navigation, Pagination]}
                className="w-full mt-10"
            >
                {activities.map((activity, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col items-center text-center">
                            <img
                                src={activity.image}
                                alt={activity.title}
                                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg"
                            />
                            <h3 className="text-[#FFFFFF] text-[20px] font-semibold mt-4">
                                {activity.title}
                            </h3>
                            <p className="text-[#B6D6FF] text-[14px]">{activity.description}</p>
                            <span className="text-[#B6D6FF] text-[12px] italic">
                                {activity.date}
                            </span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Kegiatan;
