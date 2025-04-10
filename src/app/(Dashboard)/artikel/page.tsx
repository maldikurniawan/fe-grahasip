/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, Fragment } from "react";
import { SyncLoader } from "react-spinners";
import {
  BiDetail,
  BiEdit,
  BiPlus,
  BiSearch,
  BiSortDown,
  BiSortUp,
  BiTrash,
} from "react-icons/bi";
import { useRouter } from "next/navigation";
import { API_URL_artikel } from "@/constants";
import { useDeleteData, useGetData } from "@/actions";
import { Pagination } from "@/components";
import { debounce } from "lodash";
import { encrypted } from "@/utils/crypto";
import { showSweetAlert } from "@/utils/showSweetAlert";
import { showToast } from "@/utils/showToast";
import moment from "moment";
import { FaTimes } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";

interface ArtikelInterface {
  id: void;
  title: string;
  image: string;
  content: string;
  slug: string;
  author: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ViewData {
  title?: string;
  image?: string;
  content?: string;
  created_at?: string;
}

const Artikel = () => {
  const [viewData, setViewData] = useState<ViewData>({});
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
    { title: "Release Date", field: "created_at" },
    { title: "Status", field: "status" },
    { title: "Action", field: "" },
  ];

  const getArtikel = useGetData(
    API_URL_artikel,
    ["artikel", queryParams],
    true,
    {
      limit: queryParams.limit.toString(),
      offset: queryParams.offset.toString(),
      ordering:
        queryParams.sortOrder === "desc"
          ? `-${queryParams.sortColumn}`
          : queryParams.sortColumn,
      search: queryParams.search,
    }
  );

  const deleteGetArtikel = useDeleteData(API_URL_artikel, true);

  const onDetail = (item: ArtikelInterface) => {
    setViewData(item);
    (document.getElementById("modal_artikel") as HTMLDialogElement)?.showModal();
  };

  const onEdit = (item: ArtikelInterface) => {
    const key = encrypted(item.id);
    router.push(`/artikel/form-artikel?id=${key}`);
  };

  const onDelete = (item: ArtikelInterface) => {
    showSweetAlert(`Apakah Anda yakin menghapus artikel ${item.title}`, () => {
      deleteGetArtikel.mutate(item.id, {
        onSuccess: (res) => {
          const data = res as { message: string };
          showToast(data.message, "success", 3000);
          getArtikel.refetch();
        },
        onError: (error) => {
          console.log(error);
          const data = error as { message: string };
          showToast(data.message, "warning", 3000);
        },
      });
    });
  };

  const onSearch = debounce((value) => {
    setQueryParams((prev) => ({ ...prev, search: value, offset: 0 }));
  }, 500);

  const handleSort = (column: string) => {
    setQueryParams((prev) => ({
      ...prev,
      sortColumn: column,
      sortOrder:
        prev.sortColumn === column && prev.sortOrder === "asc" ? "desc" : "asc",
      offset: 0,
    }));
  };

  // Sort icons
  const renderSortIcon = (field: string) => {
    if (field === queryParams.sortColumn) {
      return queryParams.sortOrder === "asc" ? <BiSortUp /> : <BiSortDown />;
    }
    return <BiSortUp className="text-gray-300" />;
  };

  const handlePageClick = (e: { selected: number }) => {
    setQueryParams((prev) => ({
      ...prev,
      offset: e.selected * prev.limit,
    }));
  };

  const handleSelect = (limit: number) => {
    setQueryParams((prev) => ({
      ...prev,
      limit,
      offset: 0,
    }));
  };

  const action = [
    {
      name: "detail",
      icon: <BiDetail />,
      color: "text-blue-500",
      func: onDetail,
    },
    {
      name: "edit",
      icon: <BiEdit />,
      color: "text-yellow-500",
      func: onEdit,
    },
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
          className="text-xs whitespace-nowrap font-medium flex items-center gap-1 px-3 py-2 bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-lg shadow hover:shadow-lg transition-all"
          onClick={() =>
            router.push("/artikel/form-artikel")
          }
        >
          <BiPlus size={20} />
          <span>Tambah Artikel</span>
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
                        if (item.field) {
                          handleSort(item.field);
                        }
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
                        {getArtikel.error instanceof Error
                          ? getArtikel.error.message
                          : "An unknown error occurred."}
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
                  getArtikel.data?.results?.map((item: ArtikelInterface, itemIdx: number) => (
                    <tr
                      key={itemIdx}
                      className="border-b border-gray-200 text-sm hover:bg-white/60 transition-all"
                    >
                      <td className="p-2 text-center whitespace-nowrap">
                        {itemIdx + queryParams.offset + 1}
                      </td>
                      <td className="p-2">{item.title}</td>
                      <td className="p-2 text-start xl:text-center">{moment(item.created_at).format("D MMMM YYYY")}</td>
                      <td className="p-2 text-center capitalize">{item.status}</td>
                      <td className="p-2 text-center whitespace-nowrap">
                        <div className="flex justify-center">
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
      <dialog
        id="modal_artikel"
        className="fixed inset-0 z-10 overflow-auto bg-transparent scroll-hidden"
      >
        <div className="w-full lg:w-[960px] h-fit max-w-5xl bg-white rounded-xl border border-black">
          <form method="dialog">

            <div className="flex items-center justify-between bg-gray-100 rounded-t-xl gap-2">
              <div className="text-center text-xl font-bold py-4 px-6 text-black">
                {viewData?.title}
              </div>
              <div>
                <button
                  id="button-close"
                  className="text-lg font-bold text-gray-800 py-4 px-6 hover:text-gray-900 focus:outline-none"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="w-full sm:w-[400px] py-2 pt-6 px-6">
              <img
                src={viewData?.image || "assets/images/kegiatan-dummy.jpeg"}
                alt="Artikel Pic"
                className="rounded-md"
              />
            </div>
            <div className="px-6 py-2 text-sm flex items-center gap-2 text-gray-600">
              <LuCalendarDays className='text-[#4479BC]' />
              <span>
                {moment(viewData?.created_at).format("D MMMM YYYY")}
              </span>
            </div>
            <div className="px-6">
              <div
                className="ck-editor-content text-sm text-gray-600 text-justify"
                dangerouslySetInnerHTML={{ __html: String(viewData?.content) }}
              >
              </div>
            </div>

            <button id="button-cancel" className="bg-[#1e293b] text-white font-semibold p-1 px-6 rounded-md m-6">
              Tutup
            </button>
          </form>
        </div>
      </dialog>
    </Fragment>

  );
};

export default Artikel;
