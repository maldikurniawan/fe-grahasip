"use client";
import React, { useEffect, useState } from "react";
import { MdPeople } from "react-icons/md";
import dynamic from "next/dynamic";
import { useGetData } from "@/actions";
import { API_URL_dashboard } from "@/constants";
import { TbLoader2 } from "react-icons/tb";
import Link from "next/link";
import { FaClock } from "react-icons/fa";
// const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard = () => {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const formatTime = (date: Date): string => {
        return new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Jakarta', // Time zone for Indonesia (WIB)
        }).format(date);
    };

    const getDashboardApi = useGetData(API_URL_dashboard, ["dashboard"], true);

    const chartOptions = {
        chart: {
            id: "example-chart",
            toolbar: {
                show: true,
            },
        },
        xaxis: {
            categories: getDashboardApi.data?.grafik_month || [],
        },
        title: {
            text: "Statistik Kunjungan",
            align: "center" as "center" | "left" | "right",
        },
    };

    const chartSeries = [
        {
            name: "Total Kunjungan",
            data: getDashboardApi.data?.grafik_visitors || [],
        },
    ];

    return (
        <div className="p-4 z-10">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Kartu Informasi */}
                <Link
                    href={"/riwayat-kunjungan"}
                    className="cursor-pointer bg-white shadow-lg rounded-lg p-5  hover:scale-105"
                >
                    <div className=" flex items-center">
                        <div className="bg-blue-500 text-white rounded-full p-2 mr-3">
                            <MdPeople size={24} />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold leading-5">
                                Total Kunjungan
                            </h2>
                            <p className="text-base font-semibold">
                                {/* loading  */}
                                {getDashboardApi.isLoading && (
                                    <TbLoader2 className="animate-spin" />
                                )}
                                {/* Data  */}
                                {getDashboardApi.isSuccess &&
                                    getDashboardApi.data?.total_visitors}
                            </p>
                        </div>
                    </div>
                </Link>
                <Link
                    href={"/dashboard"}
                    className="cursor-pointer bg-white shadow-lg rounded-lg p-5  hover:scale-105"
                >
                    <div className=" flex items-center">
                        <div className="bg-red-500 text-white rounded-full p-2 mr-3">
                            <FaClock size={24} />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold leading-5">
                                Digital Clock
                            </h2>
                            <p className="text-base font-semibold">
                                {formatTime(time)} WIB
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Grafik */}
            <div className="bg-white shadow-lg rounded-lg p-5 mb-6">
                {/* loading  */}
                {getDashboardApi.isLoading && (
                    <TbLoader2 className="animate-spin mx-auto" />
                )}
                {getDashboardApi.data && (
                    <div className="w-[95%] mx-auto relative -z-[00]">
                        {/* <ApexChart
                            options={chartOptions}
                            series={chartSeries}
                            type="bar"
                            height={350}
                        /> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
