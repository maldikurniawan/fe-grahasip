/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, Fragment, useEffect, useActionState } from "react";
import { SyncLoader } from "react-spinners";
import {
  BiDetail,
  BiEdit,
  BiSearch,
  BiSend,
  BiSortDown,
  BiSortUp,
  BiTrash,
} from "react-icons/bi";
import { useRouter } from "next/navigation";
import { API_URL_artikel } from "@/constants";
import { useDeleteData, useGetData, usePostData, usePutData } from "@/actions";
import { Pagination } from "@/components";
import { debounce } from "lodash";
import { showSweetAlert } from "@/utils/showSweetAlert";
import { showToast } from "@/utils/showToast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TbLoader } from "react-icons/tb";

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

const Artikel = () => {
  const [queryParams, setQueryParams] = useState({
    limit: 10,
    offset: 0,
    search: "",
    sortColumn: "",
    sortOrder: "",
  });

  const router = useRouter();

  const tableHead = [
    { title: "No", field: "id" },
    { title: "Title", field: "title" },
    { title: "Author", field: "author" },
    { title: "Status", field: "status" },
    { title: "Action", field: "" },
  ];

  const getArtikel = useGetData(
    API_URL_artikel,
    ["artikel", queryParams],
    true,
    {
      limit: queryParams.limit,
      offset: queryParams.offset,
      ordering:
        queryParams.sortOrder === "desc"
          ? `-${queryParams.sortColumn}`
          : queryParams.sortColumn,
      search: queryParams.search,
    }
  );

  const onDelete = (item: any) => {
    alert(`Delete item: ${item.name}`); // Example if item has a name property
  };

  const onSearch = debounce((value) => {
    setQueryParams((prev) => ({ ...prev, search: value, offset: 0 }));
  }, 500);

  const handleSort = (column: any) => {
    setQueryParams((prev) => ({
      ...prev,
      sortColumn: column,
      sortOrder:
        prev.sortColumn === column && prev.sortOrder === "asc" ? "desc" : "asc",
      offset: 0,
    }));
  };

  // Sort icons
  const renderSortIcon = (field: any) => {
    if (field === queryParams.sortColumn) {
      return queryParams.sortOrder === "asc" ? <BiSortUp /> : <BiSortDown />;
    }
    return <BiSortUp className="text-gray-300" />;
  };

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

  const action = [
    {
      name: "hapus",
      icon: <BiTrash />,
      color: "text-red-500",
      func: onDelete,
    },
  ];

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
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <br />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-full bg-white shadow p-4 rounded-lg">

          <div className="overflow-y-auto custom-scroll">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  {tableHead.map((item, itemIdx) => (
                    <th
                      key={itemIdx}
                      className="p-2 text-sm whitespace-nowrap"
                      onClick={() => {
                        item.field && handleSort(item.field);
                      }}
                    >
                      <span className="flex text-center items-center gap-2 justify-center">
                        {item.title}
                        {item.field && renderSortIcon(item.field)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Loading */}
                {getArtikel.isLoading && (
                  <tr>
                    <td
                      className="text-center py-12"
                      colSpan={tableHead.length + 1}
                    >
                      <div className="pt-10 pb-6 flex justify-center items-center">
                        <SyncLoader color="#111827" />
                      </div>
                    </td>
                  </tr>
                )}

                {/* Error */}
                {getArtikel.isError && (
                  <tr>
                    <td className="text-center" colSpan={tableHead.length + 1}>
                      <div className="pt-20 pb-12 flex justify-center items-center text-xs text-red-500">
                        {getArtikel.error.message}
                      </div>
                    </td>
                  </tr>
                )}

                {/* Result = 0 */}
                {getArtikel.data &&
                  getArtikel.data?.results?.length === 0 && (
                    <tr>
                      <td className="text-center" colSpan={tableHead.length + 1}>
                        <div className="pt-20 pb-12 flex justify-center items-center text-xs text-slate-600">
                          No Data
                        </div>
                      </td>
                    </tr>
                  )}

                {getArtikel.data &&
                  getArtikel.data?.results?.map((item: any, itemIdx: any) => (
                    <tr
                      key={itemIdx}
                      className="border-b border-gray-200 text-sm hover:bg-white/60 transition-all"
                    >
                      <td className="p-2 text-center whitespace-nowrap">
                        {itemIdx + queryParams.offset + 1}
                      </td>
                      <td className="p-2 text-center">{item.name}</td>
                      <td className="p-2 text-center whitespace-nowrap">
                        {item.jabatan}
                      </td>
                      <td className="p-2 flex justify-center">
                        <img
                          src={item.image ? item.image : "/assets/nophoto.png"}
                          alt="foto"
                          className="w-8 h-8 rounded-full"
                        />
                      </td>
                      <td className="p-2 text-center whitespace-nowrap">
                        <div className="flex justify-end">
                          {action.map((action, actionIdx) => (
                            <button
                              key={actionIdx}
                              className={`mx-1 ${action.color}`}
                              onClick={() => action.func(item)}
                            >
                              {action.icon}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Pagination
            handlePageClick={handlePageClick}
            pageCount={
              getArtikel.data?.count > 0 ? getArtikel.data?.count : 0
            }
            limit={queryParams.limit}
            setLimit={handleSelect}
          />
        </div>
      </div>
    </Fragment>

  );
};

export default Artikel;
