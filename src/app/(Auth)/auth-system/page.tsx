"use client";

import React, { useState, useCallback } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isShow, setIsShow] = useState<boolean>(false);

    const themeColor = "#3498db"; // Example theme color
    const colorMode: "dark" | "light" = "light"

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const optionparticles = {
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
                value: colorMode === "light" ? "#3498db" : themeColor,
            },
            links: {
                color: colorMode === "light" ? "#3498db" : themeColor,
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
            <div className="bg-base-100 dark:bg-base-800 absolute inset-0 z-0 transition-colors"></div>

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
                className="absolute z-10 inset-0 h-full w-full bg-white/50 dark:bg-black/50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
            ></div>

            <div className="relative w-screen h-screen z-20 overflow-hidden flex bg-white/10 dark:bg-base-700/10 text-base-300 dark:text-base-200 font-light">
                <div className="flex w-full items-center justify-center p-10">
                    <div className="w-full md:w-96 h-fit p-10 bg-white/10 dark:bg-base-700/10 backdrop-blur rounded-lg border border-base-100 dark:border-base-600 shadow-lg">
                        <div className="font-semibold tracking-wide">Masuk!</div>
                        <div className="tracking-wide text-sm font-normal">
                            Mohon isi data di bawah ini.
                        </div>

                        <br />

                        <form>
                            <div className="mb-2 flex flex-col gap-2">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="p-2 border rounded"
                                />
                                <div className="relative">
                                    <input
                                        type={isShow ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="p-2 border rounded w-full"
                                    />
                                    <div
                                        className="absolute top-2 right-2 cursor-pointer"
                                        onClick={() => setIsShow(!isShow)}
                                    >
                                        {isShow ? <TbEyeOff /> : <TbEye />}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded mt-4"
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
