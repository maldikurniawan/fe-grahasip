"use client";

import React, { useState, useCallback } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { Engine, IOptions, RecursivePartial } from "tsparticles-engine";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isShow, setIsShow] = useState<boolean>(false);

    const themeColor = "#4479BC";
    const colorMode: "dark" | "light" = "light";

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const optionparticles: RecursivePartial<IOptions> = {
        fullScreen: {
            enable: false,
            zIndex: 1,
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: colorMode === "light" ? "#4479BC" : themeColor,
            },
            links: {
                color: colorMode === "light" ? "#4479BC" : themeColor,
                distance: 100,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 500,
                },
                value: 80,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 2 },
            },
        },
    };

    return (
        <div className="relative overflow-hidden">
            <div className="bg-base-100 absolute inset-0 z-0 transition-colors"></div>
            <div
                style={{
                    backgroundColor: themeColor,
                }}
                className="w-24 h-24 absolute rounded-full blur-3xl top-40 left-1/2 -ml-72"
            ></div>
            <div
                style={{
                    backgroundColor: themeColor,
                }}
                className="w-20 h-20 absolute rounded-full blur-3xl bottom-40 left-1/2"
            ></div>
            <Particles
                className="absolute inset-0 z-10"
                id="tsparticles"
                init={particlesInit}
                options={optionparticles}
            />
            <div
                style={{
                    maskImage: `linear-gradient(to left top, transparent, black)`,
                    WebkitMaskImage: `linear-gradient(to left top, transparent, black)`,
                }}
                className="absolute z-10 inset-0 h-full w-full bg-white/50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            ></div>
            <div className="relative w-screen h-screen z-20 overflow-hidden flex bg-white/10 text-base-300 font-light">
                <div className="flex w-full items-center justify-center p-10">
                    <div className="w-full md:w-96 h-fit p-10 bg-white/10 backdrop-blur-lg rounded-lg border border-base-100 shadow-lg">
                        <img src="assets/images/logo.png" alt="Logo Grahasip" className="mx-auto mb-4" />
                        <div className="text-xl text-[#4479BC] font-semibold mb-10 text-center">GRAHASIP</div>
                        <form>
                            <div className="mb-4 flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="username" className="text-[#42526B] font-normal tracking-wide text-sm">Username</label>
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="p-2 px-4 border border-gray-300 rounded-md text-sm bg-transparent text-[#42526B] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                    />
                                </div>

                                <div className="flex flex-col relative">
                                    <label htmlFor="password" className="text-[#42526B] font-normal tracking-wide text-sm">Password</label>
                                    <input
                                        id="password"
                                        type={isShow ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="p-2 px-4 border border-gray-300 rounded-md text-sm bg-transparent text-[#42526B] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors w-full"
                                    />
                                    <div
                                        className="absolute top-7 text-[#42526B] right-3 cursor-pointer"
                                        onClick={() => setIsShow(!isShow)}
                                    >
                                        {isShow ? <TbEyeOff size={24} /> : <TbEye size={24} />}
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#4479BC] font-bold text-white p-2 rounded-md mt-4 hover:bg-[#6DA1EF] transition-colors"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
