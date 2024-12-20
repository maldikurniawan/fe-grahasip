/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

const Solusi = () => {
    const [solusi] = useState([
        {
            title: "ERPSKRIP",
            description:
                "Kelola bisnis dengan mudah menggunakan aplikasi ERP yang terintegrasi, menghadirkan efisiensi di setiap proses operasional.",
            image: "assets/images/logo-erp.png",
        },
        {
            title: "E-Gawi",
            description:
                "Manajemen SDM jadi lebih efektif dengan aplikasi HRD yang mencakup absensi, penggajian, hingga analisis kinerja dalam satu sistem.",
            image: "assets/images/logo-egawi.png",
        },
    ]);

    return (
        <div className="relative min-h-screen bg-white py-[60px] px-4 md:px-[60px] xl:pr-0 lg:px-[220px]">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {/* Text Section */}
                <div className="flex-1">
                    <p className="text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-tight tracking-tight">
                        Solusi Digital <br className="sm:block hidden" /> Unggulan
                    </p>
                    <p className="text-[12px] md:text-[14px] lg:text-[16px] mt-4 text-[#42526B]">
                        Solusi digital untuk mendukung kebutuhan bisnis modern melalui
                        produk unggulan. Semua aplikasi dirancang terintegrasi, memberikan
                        efisiensi maksimal bagi bisnis Anda
                    </p>
                    <div className="grid grid-cols-1 gap-4 mt-6 rounded-xl bg-[#EEFAFF] p-4 md:p-6">
                        {solusi.map((item, itemIdx) => (
                            <div
                                key={itemIdx}
                                className="flex items-start gap-4 p-2"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-[40px] h-[40px] object-cover"
                                />
                                <div>
                                    <div className="text-[#061C3D] text-[14px] md:text-[16px] font-medium mb-1">
                                        {item.title}
                                    </div>
                                    <div className="text-[#42526B] text-[12px] md:text-[14px] leading-[20px]">
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Video Section */}
                <div>
                    <video
                        className="w-full object-cover"
                        autoPlay
                        poster=""
                        preload="none"
                        muted
                        loop
                    >
                        <source
                            src={"assets/videos/solusi.mp4"}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <img
                src="assets/images/frame3.png"
                alt="Frame 3"
                className="absolute top-[540px] right-[90px] w-20 h-22 xl:right-[120px] xl:block xl:top-[140px] sm:hidden"
            />
            <img
                src="assets/images/frame14.png"
                alt="Frame 14"
                className="absolute top-[740px] w-20 h-22 xl:right-[320px] xl:block xl:top-[440px] sm:hidden max-[450px]:left-[100px]"
            />
        </div>
    );
};

export default Solusi;
