import React from 'react';
import { FiPhone } from 'react-icons/fi';

const Pertanyaan = () => {
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
                <a
                    href="/"
                    className="cursor-pointer flex items-center text-[#4479BC] text-[14px] md:text-[16px] gap-2 bg-white px-4 py-2 rounded-md shadow-md w-max"
                >
                    <FiPhone className="w-[20px] h-[20px]" />
                    Hubungi Kami
                </a>
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
                className="absolute sm:block hidden bottom-0 right-0 w-[300px] md:w-[600px] lg:w-[870px] object-cover"
            />
        </div>
    );
};

export default Pertanyaan;
