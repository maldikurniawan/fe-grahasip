/* eslint-disable @next/next/no-img-element */
"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';

const Pertanyaan: React.FC = () => {
    const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative bg-gradient-to-r from-[#1D65C0] via-[#4479BC] to-[#4479BC] bg-opacity-90 py-[50px] px-4 md:py-[70px] md:px-[60px] lg:px-[220px]">
            {/* Text Content */}
            <div className="text-white font-bold text-[24px] md:text-[32px] lg:text-[40px] leading-tight">
                Ada Pertanyaan? <br /> Jangan Ragu untuk Bertanya!
            </div>
            <div className="text-white mt-4 text-[14px] md:text-[16px] lg:text-[18px] leading-relaxed">
                Penasaran atau bingung? Jangan ragu untuk bertanya. Kami siap <br className="hidden md:block" />
                membantu Anda! Tim kami siap menjawab semua pertanyaan <br className="hidden md:block" />
                Anda dengan cepat.
            </div>

            {/* Button */}
            <div className="mt-6 md:mt-8">
                <Link
                    href={"https://api.whatsapp.com/send?phone=6285966523396&text=Halo,%20saya%20tertarik%20dengan%20produk%20Anda!"}
                    className="cursor-pointer flex items-center text-[#4479BC] text-[14px] md:text-[16px] gap-2 bg-white px-4 py-2 rounded-md shadow-md w-max"
                    target="_blank"
                >
                    <FiPhone className="w-[20px] h-[20px]" />
                    Hubungi Kami
                </Link>
            </div>

            {/* Images */}
            <img
                src="assets/images/ellipse.png"
                alt="ellipse"
                className="absolute top-0 right-0 w-[200px] md:w-[400px] lg:w-[600px] opacity-50"
            />
            <img
                src="assets/images/businessman.png"
                alt="businessman"
                className="absolute xl:block hidden bottom-0 right-0 w-[300px] md:w-[600px] lg:w-[870px] object-cover"
            />

            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className='opacity-100 z-40'
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '20px',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                    <FaArrowUp className='w-10 h-10 p-2 bg-[#D800B9] rounded-full' />
                </button>
            )}
        </div>
    );
};

export default Pertanyaan;
