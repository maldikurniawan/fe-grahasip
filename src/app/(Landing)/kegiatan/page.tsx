/* eslint-disable @next/next/no-img-element */
"use client";

import { Footer, HeaderV2 } from '@/components';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { LuCalendarDays } from 'react-icons/lu';

const ListKegiatan = () => {
    const [kegiatanUtama] = useState([
        {
            title: "ERPSKRIP ke Batam",
            description:
                "Aenean interdum arcu sit amet nulla lacinia suscipit. Vivamus at laoreet mi. Fusce pulvinar commodo ligula, et egestas dolor. Ut hendrerit blandit neque in tempor.",
            image: "assets/images/kegiatan.jpeg",
            date: "15 Sep, 2024",
        },
    ]);

    const [listKegiatan] = useState([
        {
            title: "GSIP X MUNAS APJII 2024",
            image: "assets/images/kegiatan-dummy.jpeg",
            date: "15 Sep, 2024",
        },
        {
            title: "Magang Merdeka",
            image: "assets/images/kegiatan-dummy.jpeg",
            date: "15 Sep, 2024",
        },
        {
            title: "Magang Merdeka",
            image: "assets/images/kegiatan-dummy.jpeg",
            date: "15 Sep, 2024",
        },
        {
            title: "Magang Merdeka",
            image: "assets/images/kegiatan-dummy.jpeg",
            date: "15 Sep, 2024",
        },
        {
            title: "Magang Merdeka",
            image: "assets/images/kegiatan-dummy.jpeg",
            date: "15 Sep, 2024",
        },
        {
            title: "Magang Merdeka",
            image: "assets/images/kegiatan-dummy.jpeg",
            date: "15 Sep, 2024",
        },
        {
            title: "Magang Merdeka",
            image: "assets/images/kegiatan-dummy.jpeg",
            date: "15 Sep, 2024",
        },
        {
            title: "Magang Merdeka",
            image: "assets/images/kegiatan-dummy.jpeg",
            date: "15 Sep, 2024",
        },
        {
            title: "Magang Merdeka",
            image: "assets/images/kegiatan-dummy.jpeg",
            date: "15 Sep, 2024",
        },
    ]);

    return (
        <main className="overflow-x-hidden">
            <HeaderV2 />
            <main className="space-y-[3rem]">
                <div className="min-h-screen bg-[#FAFAFA] px-4 md:px-[90px] xl:px-[215px] py-[160px]">
                    <section className="mb-10">
                        {kegiatanUtama.map((kegiatan, index) => (
                            <div key={index} className="bg-white shadow rounded-3xl p-0 md:p-6 md:flex gap-6">
                                <img
                                    src={kegiatan.image}
                                    alt={kegiatan.title}
                                    className="md:w-1/2 w-full h-auto object-cover md:rounded-xl rounded-t-xl"
                                />
                                <div className="flex flex-col p-4 md:p-10 justify-between">
                                    <div className='flex items-center gap-2'>
                                        <LuCalendarDays className='text-[#4479BC]' />
                                        <span className='text-[#42526B] text-[14px] font-normal'>{kegiatan.date}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-base text-[#061C3D] font-semibold mb-2">{kegiatan.title}</h3>
                                        <p className="text-[#42526B] text-[12px]">{kegiatan.description}</p>
                                    </div>
                                    <Link
                                        href={"/kegiatan/detail"}
                                        className="text-white mt-4 flex gap-2 text-[10px] md:text-[12px] items-center bg-[#6DA1EF] w-fit rounded-md py-2 px-6 text-start"
                                    >
                                        <span>Read More</span>
                                        <FaArrowRight />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listKegiatan.map((kegiatan, index) => (
                                <div key={index} className="bg-white shadow rounded-xl overflow-hidden">
                                    <img
                                        src={kegiatan.image}
                                        alt={kegiatan.title}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className='p-4'>
                                        <div className='flex items-center gap-2'>
                                            <LuCalendarDays className='text-[#4479BC]' />
                                            <span className='text-[#42526B] text-[14px]'>{kegiatan.date}</span>
                                        </div>
                                        <h3 className="text-base font-semibold mb-6 mt-2">{kegiatan.title}</h3>
                                        <button className="text-white flex gap-2 text-[10px] md:text-[12px] items-center bg-[#6DA1EF] w-fit rounded-md py-2 px-6 text-start">
                                            <span>Read More</span>
                                            <FaArrowRight />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </main>
    );
};

export default ListKegiatan;
