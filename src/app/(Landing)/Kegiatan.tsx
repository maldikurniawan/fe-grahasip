/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { useGetData } from "@/actions";
import { API_URL_artikel } from "@/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
import moment from "moment";
import { TbLoader2 } from "react-icons/tb";

const Kegiatan = () => {
    const router = useRouter();
    const getArtikel = useGetData(API_URL_artikel, ["artikel"], true);

    return (
        <div
            id="Kegiatan"
            className="relative min-h-screen flex py-[70px] max-[450px]:px-4 flex-col items-center justify-center"
            style={{
                background: "linear-gradient(180deg, #4479BC 0%, #4E89D4 100%)",
            }}
        >
            {/* Section Title */}
            <div className="text-center text-[#FFFFFF] text-[24px] md:text-[40px] font-bold mb-2 px-4">
                Kegiatan & Berita Terbaru
            </div>
            <div className="text-center text-[#B6D6FF] text-[10px] md:text-[12px] mb-[30px] md:mb-[50px] px-4">
                Dapatkan keuntungan maksimal dengan solusi yang disesuaikan dengan
                kebutuhan Anda
            </div>

            {/* Navigation Arrows */}
            <div className="relative flex ml-[220px] md:ml-[500px] lg:ml-[770px] gap-4 mb-4 z-10">
                <button className="swiper-button-prev-custom border-[2px] border-white text-white rounded-full p-2 shadow-md">
                    <FaArrowLeft />
                </button>
                <button className="swiper-button-next-custom border-[2px] border-white text-white rounded-full p-2 shadow-md">
                    <FaArrowRight />
                </button>
            </div>

            {/* Swiper Wrapper */}
            <div className="w-full md:w-[80%] lg:w-[2200px]">
                {getArtikel.isError && (
                    <div className="flex justify-center text-white font-bold tracking-widest">
                        Tidak terhubung dengan server
                    </div>
                )}
                {getArtikel.isLoading && (
                    <div className="flex justify-center">
                        <TbLoader2
                            className="text-white animate-spin"
                            size={50}
                        />
                    </div>
                )}

                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    centeredSlides={true}
                    breakpoints={{
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 2.5, spaceBetween: 15 },
                    }}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                    }}
                    modules={[Autoplay, Navigation]}
                >
                    {getArtikel.data &&
                        getArtikel.data?.results?.map((activity: any, index: any) => (
                            <SwiperSlide key={index}>
                                <div className="flex flex-col md:flex-row items-center md:items-start p-0 sm:p-5 bg-white rounded-xl sm:rounded-3xl shadow-lg h-auto md:h-[300px]">
                                    {/* Left Image */}
                                    <img
                                        src={activity.image || "assets/images/kegiatan-dummy.jpeg"}
                                        alt={activity.title}
                                        className="h-auto sm:h-[150px] w-full md:h-full md:w-[40%] object-cover rounded-t-xl sm:rounded-3xl mb-4 md:mb-0"
                                    />

                                    {/* Right Content */}
                                    <div className="md:px-[60px] px-4 md:py-[30px] flex flex-col p-5 justify-between h-full">
                                        <div>
                                            <div className="text-[#4E89D4] flex items-center gap-2 text-sm mb-2">
                                                <LuCalendarDays />
                                                <span>{moment(activity.created_at).format("D MMMM YYYY")}</span>
                                            </div>
                                            <div className="text-[#333] text-base md:text-lg font-semibold mb-2">
                                                {activity.title}
                                            </div>
                                            <div
                                                className="text-[#666] text-xs md:text-sm line-clamp-3"
                                                dangerouslySetInnerHTML={{ __html: String(activity?.content) }}
                                            >
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                router.push(`/kegiatan/detail/${activity.slug}`)
                                            }
                                            className="text-white max-[450px]:mt-4 flex gap-2 text-[10px] md:text-[12px] items-center bg-[#6DA1EF] w-fit rounded-md py-2 px-6 text-start"
                                        >
                                            <span>Read More</span>
                                            <FaArrowRight />
                                        </button>

                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
            {!getArtikel.isError && !getArtikel.isLoading && (
                <Link
                    href={"/kegiatan"}
                    className="text-white mt-10 border border-white py-3 px-12 rounded-md text-[12px]"
                >
                    Lihat Semua
                </Link>
            )}
            <img src="assets/images/shape.png" alt="Shape" className="absolute top-0 right-0 w-[150px] md:w-auto" />
            <img src="assets/images/vector.png" alt="Vector" className="absolute top-[100px] left-0 opacity-20 w-[150px] md:w-[350px]" />
        </div>
    );
};

export default Kegiatan;
