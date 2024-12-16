/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react'

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
            description: "GrahaSkrip selalu melakukan penangan cepat yang dikeluhkaan User.",
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
        <div className='min-h-screen bg-[#FAFAFA] py-[90px] px-4 md:px-[220px] text-center'>
            <p className='text-[42px] font-bold leading-none tracking-tight text-[#4479BC]'>
                Keuntungan Memilih Kami
            </p>
            <p className='text-[12px] mt-[24px] text-[#42526B]'>Dapatkan keuntungan maksimal dengan solusi yang disesuaikan dengan kebutuhan Anda</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[28px] gap-2">
                {keuntungan.map((item, itemIdx) => (
                    <div
                        key={itemIdx}
                        style={{ backgroundColor: item.background }}
                        className="w-full p-[26px] rounded-xl text-left"
                    >
                        <img src={item.image} alt={item.title} className='w-[165px] h-[165px] object-cover' />
                        <div>
                            <div className='text-[#061C3D] text-[16px] mb-[6px] font-semibold'>{item.title}
                            </div>
                            <div className='text-[#42526B] text-[12px] leading-[18px]'>{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Keuntungan