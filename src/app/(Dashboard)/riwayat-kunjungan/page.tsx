"use client";
import React, { useState, Fragment, useRef, useEffect } from "react";
import { SyncLoader } from "react-spinners";
import { BiDetail, BiSearch, BiSortDown, BiSortUp } from "react-icons/bi";
import { API_URL_visitor } from "@/constants";
import { debounce } from "lodash";
import { useGetData } from "@/actions";
import { Pagination } from "@/components";
import { FaTimes } from "react-icons/fa";
import moment from "moment";

interface QueryParams {
    limit: number;
    offset: number;
    search: string;
    sortColumn: string;
    sortOrder: "asc" | "desc" | "";
}

interface TableHeadItem {
    title: string;
    field: string;
}

interface VisitorData {
    id: number;
    ip_address: string;
    ipaddressdetail?: {
        org?: string;
        city?: string;
        asn?: string;
        latitude?: number;
        longitude?: number;
        [key: string]: string | number | undefined;
    };
    created_at: string;
}

const Page: React.FC = () => {
    const [dataLocationIP, setDataLocationIP] = useState<Record<string, any>>({});
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [queryParams, setQueryParams] = useState<QueryParams>({
        limit: 10,
        offset: 0,
        search: "",
        sortColumn: "",
        sortOrder: "",
    });

    const tableHead: TableHeadItem[] = [
        { title: "No", field: "id" },
        { title: "Ip Address", field: "ip_address" },
        { title: "ISP", field: "ipaddressdetail__org" },
        { title: "Kota", field: "ipaddressdetail__city" },
        { title: "ASN", field: "ipaddressdetail__asn" },
        { title: "Tanggal", field: "created_at" },
        { title: "Action", field: "" },
    ];

    // Fetch API
    const getVisitorApi = useGetData(
        API_URL_visitor,
        ["visitor", queryParams],
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

    const onView = (item: VisitorData) => {
        if (item?.ipaddressdetail) {
            setDataLocationIP(item.ipaddressdetail);
            dialogRef.current?.showModal();
        } else {
            fetch(`https://ipapi.co/${item.ip_address}/json/`)
                .then((response) => response.json())
                .then((jsonData) => {
                    setDataLocationIP(jsonData);
                    dialogRef.current?.showModal();
                })
                .catch((error) => {
                    console.error("Error fetching:", error);
                    alert(error);
                });
        }
    };

    const onSearch = debounce((value: string) => {
        setQueryParams((prev) => ({ ...prev, search: value, offset: 0 }));
    }, 500);

    const handleSort = (column: string) => {
        setQueryParams((prev) => ({
            ...prev,
            sortColumn: column,
            sortOrder: prev.sortColumn === column && prev.sortOrder === "asc" ? "desc" : "asc",
            offset: 0,
        }));
    };

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
            name: "Lihat",
            icon: <BiDetail size={20} />,
            color: "text-yellow-500",
            func: onView,
        },
    ];

    const closeModal = () => {
        setDataLocationIP({});
        dialogRef.current?.close();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dialogRef.current && event.target === dialogRef.current) {
                closeModal();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Fragment>
            <div className="flex justify-between items-center">
                <h1 className="text-lg md:text-3xl font-bold transition-all">
                    Data Riwayat Kunjungan
                </h1>
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
            {/* Content */}
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
                                {getVisitorApi.isLoading && (
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
                                {getVisitorApi.isError && (
                                    <tr>
                                        <td className="text-center" colSpan={tableHead.length + 1}>
                                            <div className="pt-20 pb-12 flex justify-center items-center text-xs text-red-500">
                                                {getVisitorApi.error.message}
                                            </div>
                                        </td>
                                    </tr>
                                )}

                                {/* Result = 0 */}
                                {getVisitorApi.data &&
                                    getVisitorApi.data?.results?.length === 0 && (
                                        <tr>
                                            <td
                                                className="text-center"
                                                colSpan={tableHead.length + 1}
                                            >
                                                <div className="pt-20 pb-12 flex justify-center items-center text-xs text-slate-600">
                                                    No Data
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                {getVisitorApi.data &&
                                    getVisitorApi.data?.results?.map((item: VisitorData, itemIdx: number) => (
                                        <tr
                                            key={itemIdx}
                                            className="border-b border-gray-200 text-sm hover:bg-white/60 transition-all"
                                        >
                                            <td className="p-2 text-center whitespace-nowrap">
                                                {itemIdx + queryParams.offset + 1}
                                            </td>
                                            <td className="p-2 text-center">{item.ip_address}</td>
                                            <td className="p-2 text-center">
                                                {item?.ipaddressdetail?.org || "-"}
                                            </td>
                                            <td className="p-2 text-center">
                                                {item?.ipaddressdetail?.city || "-"}
                                            </td>
                                            <td className="p-2 text-center">
                                                {item?.ipaddressdetail?.asn || "-"}
                                            </td>
                                            <td className="p-2 text-center whitespace-nowrap">
                                                {moment(item.created_at).format("DD MMMM YYYY-HH:mm") +
                                                    " WIB" || "-"}
                                            </td>

                                            <td className="p-2 text-center whitespace-nowrap">
                                                <div className="flex justify-center">
                                                    {action.map((action, actionIdx) => (
                                                        <button
                                                            key={actionIdx}
                                                            data-tip={action.name}
                                                            className={`mx-1.5 ${action.color} tooltip tooltip-top`}
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
                            getVisitorApi.data?.count > 0 ? getVisitorApi.data?.count : 0
                        }
                        limit={queryParams.limit}
                        setLimit={handleSelect}
                    />
                </div>
            </div>

            <dialog ref={dialogRef} className="w-full max-w-lg rounded-xl bg-white border border-black scroll-hidden">
                <div className="flex items-center justify-between bg-gray-100 gap-2">
                    <div className="text-center text-xl font-bold py-4 px-4 text-black">
                        User Agent
                    </div>
                    <button
                        onClick={closeModal}
                        className="text-lg font-bold text-gray-800 py-4 px-4 hover:text-gray-900 focus:outline-none"
                    >
                        <FaTimes />
                    </button>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-4 mx-4">
                    {Object.keys(dataLocationIP)?.map((key) => (
                        <div key={key} className="bg-gray-100 rounded-lg p-2 shadow">
                            <div className="flex justify-between gap-2">
                                <strong className="text-gray-700 uppercase text-xs">{key}:</strong>
                                <span className="text-gray-900 text-xs">
                                    {dataLocationIP[key]?.toString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-end">
                    <button onClick={closeModal} className="bg-[#1e293b] text-white font-semibold p-1 px-6 rounded-md m-4">
                        Close
                    </button>
                </div>
            </dialog>
        </Fragment>
    );
};

export default Page;
