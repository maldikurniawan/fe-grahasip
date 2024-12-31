/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetData } from '@/actions';
import { Footer, HeaderV2, Pagination } from '@/components';
import { API_URL_artikel } from '@/constants';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { LuCalendarDays } from 'react-icons/lu';
import { debounce } from "lodash";
import { BiSearch } from 'react-icons/bi';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { TbLoader2 } from 'react-icons/tb';

const ListKegiatan = () => {
    const router = useRouter();
    const [queryParams, setQueryParams] = useState({
        limit: 9,
        offset: 0,
        search: "",
    });
    const getArtikel = useGetData(
        API_URL_artikel,
        ["artikel", queryParams],
        true,
        {
            limit: queryParams.limit,
            offset: queryParams.offset,
            search: queryParams.search,
        }
    );

    const onSearch = debounce((value) => {
        setQueryParams((prev) => ({ ...prev, search: value, offset: 0 }));
    }, 500);

    const [kegiatanUtama] = useState([
        {
            title: "ERPSKRIP ke Batam",
            description:
                "Aenean interdum arcu sit amet nulla lacinia suscipit. Vivamus at laoreet mi. Fusce pulvinar commodo ligula, et egestas dolor. Ut hendrerit blandit neque in tempor.",
            image: "assets/images/kegiatan.jpeg",
            date: "15 Sep, 2024",
        },
    ]);

    const handlePageClick = (e: any) => {
        setQueryParams((prev) => ({
            ...prev,
            offset: e.selected * prev.limit,
        }));
    };

    const handleSelect = (limit: any) => {
        setQueryParams((prev) => ({
            ...prev,
            limit,
            offset: 0,
        }));
    };


    return (
        <main className="overflow-x-hidden">
            <HeaderV2 />
            <main className="space-y-[3rem]">
                <div className="min-h-screen bg-[#FAFAFA] px-4 md:px-[90px] xl:px-[215px] py-[160px]">
                    <section className="mb-10">
                        {kegiatanUtama.map((kegiatan, index) => (
                            <div key={index} className="bg-white shadow rounded-3xl p-0 md:p-6 md:flex gap-6">
                                <img
                                    src={kegiatan.image}
                                    alt={kegiatan.title}
                                    className="md:w-1/2 w-full h-auto object-cover md:rounded-xl rounded-t-xl"
                                />
                                <div className="flex flex-col p-4 md:p-10 justify-between">
                                    <div className='flex items-center gap-2'>
                                        <LuCalendarDays className='text-[#4479BC]' />
                                        <span className='text-[#42526B] text-[14px] font-normal'>{kegiatan.date}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-base text-[#061C3D] font-semibold mb-2">{kegiatan.title}</h3>
                                        <p className="text-[#42526B] text-[12px]">{kegiatan.description}</p>
                                    </div>
                                    <Link
                                        href={"/kegiatan/detail"}
                                        className="text-white mt-4 flex gap-2 text-[10px] md:text-[12px] items-center bg-[#6DA1EF] w-fit rounded-md py-2 px-6 text-start"
                                    >
                                        <span>Read More</span>
                                        <FaArrowRight />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section>
                        <div className="w-full flex items-center text-gray-600 bg-white p-1 rounded-lg mb-6 shadow">
                            <div className="p-1 text-lg mr-3">
                                <BiSearch />
                            </div>
                            <input
                                type="text"
                                className="w-full p-1 bg-white"
                                placeholder="Search..."
                                onChange={(e) => onSearch(e.target.value)}
                            />
                        </div>
                        {getArtikel.isError && (
                            <div className="flex justify-center text-black font-bold tracking-widest">
                                Tidak terhubung dengan server
                            </div>
                        )}
                        {getArtikel.isLoading && (
                            <div className="flex justify-center">
                                <TbLoader2
                                    className="text-black animate-spin"
                                    size={50}
                                />
                            </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getArtikel.data &&
                                getArtikel.data?.results?.map((kegiatan: any, index: any) => (
                                    <div key={index} className="bg-white shadow rounded-xl overflow-hidden">
                                        <img
                                            src={kegiatan.image || "assets/images/kegiatan-dummy.jpeg"}
                                            alt={kegiatan.title}
                                            className="w-full h-40 object-cover"
                                        />
                                        <div className='p-4'>
                                            <div className="text-[#4E89D4] flex items-center gap-2 text-sm mb-2">
                                                <LuCalendarDays />
                                                <span>{moment(kegiatan.created_at).format("D MMMM YYYY")}</span>
                                            </div>
                                            <h3 className="text-base font-semibold mb-6 mt-2">{kegiatan.title}</h3>
                                            <button
                                                onClick={() =>
                                                    router.push(`/kegiatan/detail/${kegiatan.slug}`)
                                                }
                                                className="text-white flex gap-2 text-[10px] md:text-[12px] items-center bg-[#6DA1EF] w-fit rounded-md py-2 px-6 text-start"
                                            >
                                                <span>Read More</span>
                                                <FaArrowRight />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <Pagination
                            handlePageClick={handlePageClick}
                            pageCount={
                                getArtikel.data?.count > 0 ? getArtikel.data?.count : 0
                            }
                            limit={queryParams.limit}
                            setLimit={handleSelect}
                        />
                    </section>
                </div>
            </main>
            <Footer />
        </main>
    );
};

export default ListKegiatan;
