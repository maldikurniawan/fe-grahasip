/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Footer, HeaderV2 } from '@/components';
import { API_URL_artikelSlug } from '@/constants';
import moment from 'moment';
import React from 'react';
import { LuCalendarDays } from 'react-icons/lu';

const Page: React.FC<{ params: Promise<{ slug: string }> }> = ({ params }) => {
  const [artikelData, setArtikelData] = useState<any>(null);

  // Fetch the article data when params resolve
  useEffect(() => {
    params.then((resolvedParams) => {
      const slug = resolvedParams.slug;
      const fetchData = async () => {
        const response = await fetch(API_URL_artikelSlug + slug + "/");
        const data = await response.json();
        setArtikelData(data);
      };
      fetchData();
    }).catch((error) => {
      console.error('Error resolving params:', error);
    });
  }, [params]);

  return (
    <div className="overflow-x-hidden">
      {/* Pass the title to HeaderV2 */}
      <HeaderV2 title={`/ ${artikelData?.title || "Loading..."}`} />
      <div className="min-h-screen bg-[#FAFAFA] px-4 md:px-[90px] xl:px-[215px] py-[140px]">
        {artikelData && (
          <div className="rounded-3xl flex flex-col gap-2">
            <img
              src={artikelData.image || "/assets/images/kegiatan-dummy.jpeg"}
              alt={artikelData.title || "Article Image"}
              className="w-full h-auto object-cover rounded-xl"
            />
            <div className="text-[#4E89D4] flex items-center gap-2 mt-2">
              <LuCalendarDays />
              <span>{moment(artikelData.created_at).format("D MMMM YYYY")}</span>
            </div>
            <div>
              <h1 className="text-xl text-[#061C3D] font-semibold mb-4">{artikelData.title}</h1>
              <div
                className="ck-editor-content text-[#42526B] text-justify"
                dangerouslySetInnerHTML={{ __html: String(artikelData.content) }}
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
