/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, Fragment } from "react";
import { BiDetail, BiEdit, BiSearch, BiTrash } from "react-icons/bi";
import { Pagination } from "@/components";
import { API_URL_artikel } from "@/constants";
import { useDeleteData, useGetData, usePostData, usePutData } from "@/actions";
import { showSweetAlert } from "@/utils/showSweetAlert";
import { showToast } from "@/utils/showToast";

interface Artikel {
  id: string;
  title: string;
  image: string;
  content: string;
  slug: string;
  author: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const Artikel: React.FC = () => {
  const [articles, setArticles] = useState<Artikel[]>([]);
  const [queryParams, setQueryParams] = useState({
    limit: 10,
    offset: 0,
    search: "",
    currentPage: 1,
  });
  const totalCount = 100; // Replace with the actual total count from API

  const fetchArticles = async () => {
    try {
      const { limit, offset, search } = queryParams;
      const { data } = await useGetData(`${API_URL_artikel}?limit=${limit}&offset=${offset}&search=${search}`);

      if (data) {
        setArticles(data.results); // Adjust based on the actual API response structure
      } else {
        showToast("No data found", "info");
      }
    } catch (error) {
      showToast("Failed to fetch articles", "error");
    }
  };

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      currentPage: page,
      offset: (page - 1) * prev.limit,
    }));
    fetchArticles();
  };

  const onDelete = async (id: string) => {
    try {
      await useDeleteData(`${API_URL_artikel}/${id}`);
      showToast("Article deleted successfully", "success");
      fetchArticles();
    } catch (error) {
      showToast("Failed to delete article", "error");
    }
  };

  const tableHead = [
    { title: "No", field: "id" },
    { title: "Title", field: "title" },
    { title: "Author", field: "author" },
    { title: "Status", field: "status" },
    { title: "Action", field: "" },
  ];

  React.useEffect(() => {
    fetchArticles();
  }, [queryParams]);

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-bold">Data Artikel</h1>
        <button
          className="text-xs whitespace-nowrap font-medium px-3 py-2 bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-lg shadow hover:shadow-lg transition-all"
        >
          Tambah Artikel
        </button>
      </div>
      <br />
      <div className="w-full flex items-center text-gray-600 bg-white p-1 rounded-lg">
        <div className="p-1 text-lg mr-3">
          <BiSearch />
        </div>
        <input
          type="text"
          className="w-full p-1 bg-white"
          placeholder="Search"
          onChange={(e) => setQueryParams({ ...queryParams, search: e.target.value })}
        />
      </div>
      <br />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-full bg-white shadow p-4 rounded-lg">

          <div className="overflow-y-auto custom-scroll">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  {tableHead.map((item, idx) => (
                    <th key={idx} className="p-2 text-sm whitespace-nowrap">
                      {item.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {articles.length > 0 ? (
                  articles.map((item, idx) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2 text-sm">{idx + 1}</td>
                      <td className="p-2 text-sm">{item.title}</td>
                      <td className="p-2 text-sm">{item.author}</td>
                      <td className="p-2 text-sm">{item.status}</td>
                      <td className="p-2 text-sm flex gap-2">
                        <button className="text-blue-500">
                          <BiDetail size={20} />
                        </button>
                        <button className="text-yellow-500">
                          <BiEdit size={20} />
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => onDelete(item.id)}
                        >
                          <BiTrash size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center p-4">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            totalCount={totalCount}
            currentPage={queryParams.currentPage}
            pageSize={queryParams.limit}
            onPageChange={handlePageChange}
            activeColor="primary"
            rounded="md"
            variant="solid"
            size="md"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Artikel;
