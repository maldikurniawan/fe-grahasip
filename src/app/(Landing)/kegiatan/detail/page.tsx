/* eslint-disable @next/next/no-img-element */
"use client";

import { Footer, HeaderV2 } from '@/components'
import React, { useState } from 'react'
import { LuCalendarDays } from 'react-icons/lu';

const DetailKegiatan = () => {
    const [kegiatanDetail] = useState([
        {
            title: "ERPSKRIP ke Batam",
            description:
                "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
            image: "/assets/images/kegiatan.jpeg",
            date: "15 Sep, 2024",
        },
    ]);
    return (
        <main className="overflow-x-hidden">
            <HeaderV2 />
            <main className="space-y-[3rem]">
                <div className='min-h-screen bg-[#FAFAFA] px-4 md:px-[90px] xl:px-[215px] py-[140px]'>
                    {kegiatanDetail.map((kegiatan, index) => (
                        <div key={index} className="rounded-3xl flex flex-col md:flex gap-2">
                            <img
                                src={kegiatan.image}
                                alt={kegiatan.title}
                                className="w-full h-auto object-cover md:rounded-xl rounded-t-xl"
                            />
                            <div className='flex items-center gap-2'>
                                <LuCalendarDays className='text-[#4479BC]' />
                                <span className='text-[#42526B]'>{kegiatan.date}</span>
                            </div>
                            <div>
                                <h3 className="text-xl text-[#061C3D] font-semibold mb-6">{kegiatan.title}</h3>
                                <p className="text-[#42526B] text-lg mb-4 text-justify">{kegiatan.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </main>
    )
}

export default DetailKegiatan