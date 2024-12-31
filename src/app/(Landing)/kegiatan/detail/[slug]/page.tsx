/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useGetData } from '@/actions';
import { Footer, HeaderV2 } from '@/components';
import { API_URL_artikelSlug } from '@/constants';
import moment from 'moment';
import React from 'react';
import { LuCalendarDays } from 'react-icons/lu';

const Page: React.FC<{ params: Promise<{ slug: string }> }> = ({ params }) => {
  const [slug, setSlug] = useState<string | null>(null);

  // Unwrap the params Promise
  useEffect(() => {
    params.then((resolvedParams) => {
      setSlug(resolvedParams.slug);
    }).catch((error) => {
      console.error('Error resolving params:', error);
    });
  }, [params]);

  // Fetch the article data
  const getArtikel = useGetData(
    API_URL_artikelSlug + slug + "/",
    ["artikel", slug]
  );


  return (
    <div className="overflow-x-hidden">
      <HeaderV2 />
      <div className="min-h-screen bg-[#FAFAFA] px-4 md:px-[90px] xl:px-[215px] py-[140px]">
        {getArtikel.isSuccess &&
          getArtikel.data && (
            <div className="rounded-3xl flex flex-col gap-6">
              <img
                src={getArtikel?.data.image || "/assets/images/kegiatan-dummy.jpeg"}
                alt={getArtikel?.data.title || "Article Image"}
                className="w-full h-auto object-cover rounded-xl"
              />
              <div className="text-[#4E89D4] flex items-center gap-2 text-sm mb-2">
                <LuCalendarDays />
                <span>{moment(getArtikel.data?.created_at).format("D MMMM YYYY")}</span>
              </div>
              <div>
                <h1 className="text-xl text-[#061C3D] font-semibold mb-6">{getArtikel.data?.title}</h1>
                <div
                  className="text-[#42526B] text-lg mb-4 text-justify"
                  dangerouslySetInnerHTML={{ __html: String(getArtikel.data?.content) }}
                />
              </div>
            </div>
          )}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
