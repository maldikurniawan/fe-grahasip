/* eslint-disable @next/next/no-img-element */
"use client";

import { useGetData } from '@/actions';
import { Footer, HeaderV2 } from '@/components'
import { API_URL_artikel } from '@/constants';
import moment from 'moment';
import React from 'react'
import { LuCalendarDays } from 'react-icons/lu';

const Page = ({ params }) => {
  const { slug } = params;
  const getArtikel = useGetData(API_URL_artikel, ["artikel", slug]);
  return (
    <main className="overflow-x-hidden">
      <HeaderV2 />
      <main className="space-y-[3rem]">
        <div className='min-h-screen bg-[#FAFAFA] px-4 md:px-[90px] xl:px-[215px] py-[140px]'>
          {getArtikel.isSuccess &&
            getArtikel.data && (

              <div className="rounded-3xl flex flex-col md:flex gap-2">
                <img
                  src={getArtikel.data?.image || "assets/images/kegiatan-dummy.jpeg"}
                  alt={getArtikel.data?.title}
                  className="w-full h-auto object-cover rounded-xl"
                />
                <div className="text-[#4E89D4] flex items-center gap-2 text-sm mb-2">
                  <LuCalendarDays />
                  <span>{moment(getArtikel.data?.created_at).format("D MMMM YYYY")}</span>
                </div>
                <div>
                  <div className="text-xl text-[#061C3D] font-semibold mb-6">{getArtikel.data?.title}</div>
                  <div
                    className="text-[#42526B] text-lg mb-4 text-justify"
                    dangerouslySetInnerHTML={{ __html: String(getArtikel.data?.content) }}
                  >
                  </div>
                </div>
              </div>
            )}
        </div>
      </main>
      <Footer />
    </main>
  )
}

export default Page