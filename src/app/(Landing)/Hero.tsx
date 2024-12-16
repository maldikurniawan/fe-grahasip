import React from 'react'

const Hero = () => {
    return (
        <div className='min-h-screen bg-[#FAFAFA] pt-[160px] pb-[90px] px-4 md:px-[220px]'>
            <div className='flex justify-between mb-[80px]'>
                <div className='text-[48px] font-bold leading-[55px] text-[#061C3D]'>
                    Partner terpercaya <br /> dalam pembangunan
                    <div>
                        infrastruktur
                        <span className='text-white bg-[#4479BC] bg-opacity-90 ml-2'>Modern</span>
                    </div>
                </div>
                <div className='pt-[50px] text-[14px]'>
                    Nikmati kemudahan manajemen bisnis ISP anda dengan <br />
                    <div>
                        <span className='text-white bg-[#4479BC] px-1'>ERPSKRIP</span>
                        , dan EGAWI. yang sudah terhubung dalam
                    </div>
                    satu platform terpadu.
                </div>
            </div>
            <img
                src="assets/images/vector32.png"
                alt="Vector 32"
                className='absolute top-[350px] left-[240px] w-[340px]'
            />
            <video
                className="w-full h-[300px] rounded-2xl object-cover"
                autoPlay
                poster={""}
                preload="none"
                muted
                loop
            >
                <source
                    src={"assets/videos/intro.mp4"}
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default Hero