/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';

const Keuntungan = () => {
    const [keuntungan] = useState([
        {
            title: "Keamanan",
            description: "GrahaSkrip menerapkan keamanan untuk melindungi operasi aplikasinya untuk User.",
            image: "assets/images/k1.png",
            background: "#EEFAFF",
        },
        {
            title: "Penanganan Cepat",
            description: "GrahaSkrip selalu melakukan penangan cepat yang dikeluhkan User.",
            image: "assets/images/k2.png",
            background: "#F0FFEE",
        },
        {
            title: "Peningkatan Produktivitas",
            description: "GrahaSkrip dapat membantu meningkatkan produktivitas Perusahaan anda.",
            image: "assets/images/k3.png",
            background: "#FFFDEE",
        },
    ]);

    return (
        <div
            id='Keuntungan'
            className="min-h-screen bg-[#FAFAFA] py-[60px] px-4 flex flex-col items-center sm:px-[20px] md:px-[80px] lg:px-[150px] xl:px-[220px] justify-center text-center"
        >
            {/* Title Section */}
            <p className="text-[28px] sm:text-[36px] md:text-[42px] font-bold leading-none tracking-tight text-[#4479BC]">
                Keuntungan <br className='sm:hidden block' /> Memilih Kami
            </p>
            <p className="text-[12px] sm:text-[14px] mt-[16px] sm:mt-[20px] md:mt-[24px] text-[#42526B]">
                Dapatkan keuntungan maksimal dengan solusi yang disesuaikan dengan kebutuhan Anda
            </p>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[20px] sm:mt-[28px] justify-center">
                {keuntungan.map((item, itemIdx) => (
                    <div
                        key={itemIdx}
                        style={{ backgroundColor: item.background }}
                        className="p-6 sm:p-[20px] md:p-[26px] rounded-xl text-left shadow-md"
                    >
                        {/* Image */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-[120px] sm:w-[140px] md:w-[165px] h-[120px] sm:h-[140px] md:h-[165px] object-cover mb-4 mx-auto"
                        />
                        {/* Title */}
                        <div className="text-[#061C3D] text-[14px] sm:text-[16px] font-semibold mb-2 text-start">
                            {item.title}
                        </div>
                        {/* Description */}
                        <div className="text-[#42526B] text-[12px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-start">
                            {item.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Keuntungan;
