import React from 'react'
import { FiPhone } from 'react-icons/fi'

const Pertanyaan = () => {
    return (
        <div className='h-[420px] bg-gradient-to-r from-[#1D65C0] via-[#4479BC] to-[#4479BC] bg-opacity-90 py-[70px] px-[220px]'>
            <div className='text-white font-bold text-[40px] leading-[40px]'>
                Ada Pertanyaan? <br /> Jangan Ragu untuk Bertanya!
            </div>
            <div className='text-white my-8'>
                Penasaran atau bingung? Jangan ragu untuk bertanya. Kami siap <br /> membantu Anda! Tim kami siap menjawab semua pertanyaan <br /> Anda dengan cepat.
            </div>
            <div className="text-sm py-2 font-medium text-[#4479BC] w-[160px] bg-white px-4 rounded-md">
                <a href="/" className="cursor-pointer flex items-center text-[14px] gap-2">
                    <FiPhone className="w-[20px] h-[20px]" />
                    Hubungi Kami
                </a>
            </div>
        </div>
    )
}

export default Pertanyaan