/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react'

const Solusi = () => {
    const [solusi] = useState([
        {
            title: "ERPSKRIP",
            description: "Kelola bisnis dengan mudah menggunakan aplikasi ERP yang terintegrasi, menghadirkan efisiensi di setiap proses operasional.",
            image: "assets/images/logo-erp.png",
        },
        {
            title: "E-Gawi",
            description: "Manajemen SDM jadi lebih efektif dengan aplikasi HRD yang mencakup absensi, penggajian, hingga analisis kinerja dalam satu sistem.",
            image: "assets/images/logo-egawi.png",
        },
    ]);
    return (
        <div className='min-h-screen bg-white py-[90px] px-4 md:px-[220px]'>
            <div className='flex justify-between'>
                <div>
                    <p className='text-[42px] font-bold leading-none tracking-tight'>
                        Solusi Digital <br /> Unggulan
                    </p>
                    <p className='text-[12px] mt-[24px] text-[#42526B]'>Solusi digital untuk mendukung kebutuhan bisnis modern melalui <br /> produk unggulan. Semua aplikasi dirancang terintegrasi, memberikan <br /> efisiensi maksimal bagi bisnis Anda</p>
                    <div className="grid grid-cols-1 mt-[28px] rounded-xl bg-[#EEFAFF]">
                        {solusi.map((item, itemIdx) => (
                            <div
                                key={itemIdx}
                                className="w-[380px] flex p-[20px] gap-4"
                            >
                                <img src={item.image} alt={item.title} className='w-[40px] h-[40px] object-cover' />
                                <div>
                                    <div className='text-[#061C3D] text-[16px] mb-[4px]'>{item.title}
                                    </div>
                                    <div className='text-[#42526B] text-[12px] leading-[24px]'>{item.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='absolute -right-[70px] top-[900px]'>
                    <img
                        src="assets/images/laptop.png"
                        alt="Laptop"
                        className='w-[800px] h-[514px]'
                    />
                </div>
            </div>
            <div className='absolute w-[340px] top-[1215px] left-[240px] border border-t border-gray-200'></div>
        </div>
    )
}

export default Solusi