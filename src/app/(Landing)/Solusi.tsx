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
        <div className="min-h-screen bg-white py-[60px] px-4 md:px-[60px] lg:px-[220px]">
            <div className="flex flex-col md:flex-row justify-between gap-10">
                {/* Text Section */}
                <div className="flex-1">
                    <p className="text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-tight tracking-tight">
                        Solusi Digital <br /> Unggulan
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
                                className="flex items-start gap-4 p-2 md:p-4 bg-white rounded-lg shadow-sm"
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

                {/* Image Section */}
                <div className="flex-1 flex justify-center">
                    <img
                        src="assets/images/laptop.png"
                        alt="Laptop"
                        className="w-[300px] h-[200px] md:w-[500px] md:h-[320px] lg:w-[800px] lg:h-[514px] object-contain"
                    />
                </div>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-gray-200 mt-10 md:mt-20"></div>
        </div>
    );
};

export default Solusi;
