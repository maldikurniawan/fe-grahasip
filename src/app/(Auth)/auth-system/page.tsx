"use client";

import React, { useCallback, useEffect, useState } from "react";
import { TbEye, TbEyeOff, TbLoader2 } from "react-icons/tb";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { Engine, IOptions, RecursivePartial } from "tsparticles-engine";
import { API_URL_login } from "@/constants";
import { InputField } from "@/components";
import { useRouter } from "next/navigation";
import Swal, { SweetAlertOptions } from "sweetalert2";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast: HTMLElement) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
} as SweetAlertOptions);

const LoginPage: React.FC = () => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

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

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setLoading(true);
            try {
                const response = await axios.post(API_URL_login, values);
                const { access, refresh } = response.data;
                localStorage.setItem("access", access);
                localStorage.setItem("refresh", refresh);
                router.push("/dashboard");
                setTimeout(() => {
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully!",
                    });
                }, 1000);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    // Now 'error' is typed as 'Error'
                    Swal.fire({
                        icon: "error",
                        title: "Login Gagal!",
                        text: "Periksa kembali Username dan Password Anda!",
                    });
                } else {
                    // Handle unexpected error types
                    Swal.fire({
                        icon: "error",
                        title: "Login Gagal!",
                        text: "Terjadi kesalahan yang tidak diketahui!",
                    });
                }
            } finally {
                setLoading(false);
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        const access = localStorage.getItem("access");
        if (access) {
            router.push("/dashboard");
        }
    }, [router]);

    return (
        <div className="relative overflow-hidden">
            <div className="bg-base-100 absolute inset-0 z-0 transition-colors"></div>
            <div
                style={{ backgroundColor: themeColor }}
                className="w-24 h-24 absolute rounded-full blur-3xl top-40 left-1/2 -ml-72"
            ></div>
            <div
                style={{ backgroundColor: themeColor }}
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
                        <img
                            src="assets/images/logo.png"
                            alt="Logo Grahasip"
                            className="mx-auto mb-4"
                        />
                        <div className="text-xl text-[#4479BC] font-semibold mb-10 text-center">
                            GRAHASIP
                        </div>
                        <form onSubmit={formik.handleSubmit} className="space-y-4">
                            <InputField
                                label="Username"
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && formik.errors.username}
                                required={true}
                            />
                            <div className="relative">
                                <InputField
                                    label="Password"
                                    id="password"
                                    name="password"
                                    type={isShow ? "text" : "password"}
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && formik.errors.password}
                                    required={true}
                                />
                                <div
                                    className="absolute top-7 text-[#42526B] right-2 cursor-pointer"
                                    onClick={() => setIsShow(!isShow)}
                                >
                                    {isShow ? <TbEyeOff size={24} /> : <TbEye size={24} />}
                                </div>
                            </div>
                            <div></div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#4479BC] font-bold text-white p-2 rounded-md hover:bg-[#6DA1EF] transition-colors"
                            >
                                {loading ? (
                                    <TbLoader2 size={20} className="animate-spin mx-auto" />
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
