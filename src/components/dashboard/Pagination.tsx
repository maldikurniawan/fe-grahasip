/* eslint-disable @next/next/no-img-element */
"use client";

import { DOTS, usePagination } from "@/hooks/usePagination";
import { TbChevronLeft, TbChevronRight, TbDots } from "react-icons/tb";
import { Button } from "@/components";
import { useWindowSize } from "@/hooks/useWindowSize";

interface PaginationProps {
    onPageChange: (page: number) => void;
    totalCount: number;
    siblingCount?: number;
    currentPage: number;
    pageSize: number;
    activeColor: "primary" | "base" | "success" | "warning" | "danger" | "info";
    rounded: "none" | "sm" | "rounded" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
    variant: "solid" | "flat";
    size: "xs" | "sm" | "md" | "lg" | "xl";
}

const Pagination: React.FC<PaginationProps> = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    activeColor,
    rounded,
    variant,
    size,
}) => {
    const { width } = useWindowSize();
    const siblings = width < 640 ? 0 : siblingCount;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount: siblings,
        pageSize,
    });

    if (!paginationRange || paginationRange.length === 0) return null;

    const onNext = () => onPageChange(currentPage + 1);
    const onPrevious = () => onPageChange(currentPage - 1);

    const colorPagination =
        {
            primary: "#3B82F6",
            base: "#BABCBD",
            success: "#4ED17E",
            warning: "#EEC239",
            danger: "#F26969",
            info: "#629BF8",
        }[activeColor] || "#3B82F6";

    const sizePagination =
        {
            xs: 25,
            sm: 30,
            md: 35,
            lg: 40,
            xl: 45,
        }[size] || 35;

    const lastPage = paginationRange[paginationRange.length - 1];

    return (
        <div className={`flex gap-2`}>
            {totalCount > 0 && (
                <>
                    <Button
                        size={sizePagination}
                        className={`text-xs`}
                        color="#BABCBD95"
                        textColor="white"
                        variant={variant}
                        rounded={rounded}
                        onClick={onPrevious}
                        disabled={currentPage === 1}
                    >
                        <TbChevronLeft />
                    </Button>

                    {paginationRange.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return (
                                <Button
                                    key={index}
                                    size={sizePagination}
                                    className="text-xs"
                                    color="#BABCBD95"
                                    textColor="white"
                                    variant={variant}
                                    rounded={rounded}
                                    disabled
                                >
                                    <TbDots />
                                </Button>
                            );
                        }

                        return (
                            <Button
                                key={index}
                                size={sizePagination}
                                className="text-xs"
                                color={pageNumber === currentPage ? colorPagination : "#BABCBD95"}
                                textColor={pageNumber === currentPage ? "white" : "white"}
                                variant={variant}
                                rounded={rounded}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </Button>
                        );
                    })}

                    <Button
                        size={sizePagination}
                        className="text-xs"
                        color="#BABCBD95"
                        textColor="white"
                        variant={variant}
                        rounded={rounded}
                        disabled={currentPage === lastPage}
                        onClick={onNext}
                    >
                        <TbChevronRight />
                    </Button>
                </>
            )}
        </div>
    );
};

export default Pagination;
