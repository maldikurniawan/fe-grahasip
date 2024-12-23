import React from 'react';

const Hero = () => {
    return (
        <div id='Home' className="min-h-screen bg-[#FAFAFA] pt-[120px] sm:pb-[60px] px-4 sm:px-[20px] md:px-[36px] lg:px-[120px] xl:px-[220px] relative">
            {/* Flex Container */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-[40px] md:mb-[60px] xl:mb-[80px]">
                {/* Left Section */}
                <div className="text-[28px] sm:text-[36px] md:text-[48px] font-bold leading-[40px] sm:leading-[48px] md:leading-[55px] text-[#061C3D]">
                    Partner terpercaya <br /> untuk pembangunan
                    <div>
                        infrastruktur
                        <span className="text-white bg-[#4479BC] bg-opacity-90 ml-2 px-1 sm:px-2 rounded-md">
                            Modern
                        </span>
                    </div>
                </div>
                {/* Right Section */}
                <div className="mt-6 xl:mt-0 text-[14px] sm:text-[16px] text-left text-[#061C3D]">
                    Nikmati kemudahan manajemen bisnis ISP anda dengan <br className='max-[450px]:hidden' />
                    <span className="text-white bg-[#4479BC] px-1 sm:px-2 rounded-md">
                        ERPSKRIP
                    </span>
                    , dan EGAWI, yang sudah terhubung dalam
                    <br className='max-[450px]:hidden' />
                    satu platform terpadu.
                </div>
            </div>

            {/* Decorative Image */}
            <img
                src="assets/images/vector32.png"
                alt="Vector 32"
                className="absolute left-[110px] -translate-x-1/2 top-[245px] sm:top-[270px] md:top-[290px] sm:left-[150px] md:left-[210px] lg:left-[290px] xl:left-[390px] w-[180px] sm:w-[240px] md:w-[320px]"
            />

            {/* Video Section */}
            <div className="mt-10 sm:mt-10">
                <video
                    className="w-full h-[180px] sm:h-[250px] md:h-[300px] lg:h-[400px] rounded-2xl object-cover"
                    autoPlay
                    poster=""
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
        </div>
    );
};

export default Hero;
