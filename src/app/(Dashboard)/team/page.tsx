/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, Fragment } from "react";
import { SyncLoader } from "react-spinners";
import {
  BiEdit,
  BiPlus,
  BiSearch,
  BiSortDown,
  BiSortUp,
  BiTrash,
} from "react-icons/bi";
import { useRouter } from "next/navigation";
import { API_URL_team } from "@/constants";
import { useDeleteData, useGetData } from "@/actions";
import { Pagination } from "@/components";
import { debounce } from "lodash";
import { encrypted } from "@/utils/crypto";
import { showSweetAlert } from "@/utils/showSweetAlert";
import { showToast } from "@/utils/showToast";

interface TeamInterface {
  id: void;
  name: string;
  image: string;
  position: string;
  created_at: string;
  updated_at: string;
}

const Team = () => {
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
    { title: "Name", field: "name" },
    { title: "Position", field: "position" },
    { title: "Image", field: "image" },
    { title: "Action", field: "" },
  ];

  const getTeam = useGetData(
    API_URL_team,
    ["team", queryParams],
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

  const deleteGetTeam = useDeleteData(API_URL_team, true);

  const onEdit = (item: TeamInterface) => {
    const key = encrypted(item.id);
    router.push(`/team/form-team?id=${key}`);
  };

  const onDelete = (item: TeamInterface) => {
    showSweetAlert(`Apakah Anda yakin menghapus ${item.name} dari tim`, () => {
      deleteGetTeam.mutate(item.id, {
        onSuccess: (res) => {
          const data = res as { message: string };
          showToast(data.message, "success", 3000);
          getTeam.refetch();
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

  // console.log("Team Data:", getTeam.data);

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-bold">Data Team</h1>
        <button
          className="text-xs whitespace-nowrap font-medium flex items-center gap-1 px-3 py-2 bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-lg shadow hover:shadow-lg transition-all"
          onClick={() =>
            router.push("/team/form-team")
          }
        >
          <BiPlus size={20} />
          <span>Tambah Tim</span>
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
                {getTeam.isLoading && (
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
                {getTeam.isError && (
                  <tr>
                    <td className="text-center" colSpan={tableHead.length + 1}>
                      <div className="pt-20 pb-12 flex justify-center items-center text-xs text-red-500">
                        {getTeam.error instanceof Error
                          ? getTeam.error.message
                          : "An unknown error occurred."}
                      </div>
                    </td>
                  </tr>
                )}

                {/* Result = 0 */}
                {getTeam.data &&
                  getTeam.data?.results?.length === 0 && (
                    <tr>
                      <td className="text-center" colSpan={tableHead.length + 1}>
                        <div className="pt-20 pb-12 flex justify-center items-center text-xs text-slate-600">
                          No Data
                        </div>
                      </td>
                    </tr>
                  )}

                {getTeam.data &&
                  getTeam.data?.results?.map((item: TeamInterface, itemIdx: number) => (
                    <tr
                      key={itemIdx}
                      className="border-b border-gray-200 text-sm hover:bg-white/60 transition-all"
                    >
                      <td className="p-2 text-center whitespace-nowrap">
                        {itemIdx + queryParams.offset + 1}
                      </td>
                      <td className="p-2 text-center capitalize">{item.name}</td>
                      <td className="p-2 text-center capitalize">{item.position}</td>
                      <td className="p-2">
                        <img
                          src={item.image || "assets/images/person.png"}
                          alt="Foto Profile"
                          className="rounded-full object-cover border w-10 bg-black h-10 mx-auto"
                        />
                      </td>
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
              getTeam.data?.count > 0 ? getTeam.data?.count : 0
            }
            limit={queryParams.limit}
            setLimit={handleSelect}
          />
        </div>
      </div>
    </Fragment>

  );
};

export default Team;
