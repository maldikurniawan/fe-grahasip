import axios from "axios";
import Swal from "sweetalert2";
import { useQuery, useMutation } from "@tanstack/react-query";

export const logout = () => {
    if (typeof window !== "undefined") {
        window.localStorage.removeItem("access");
        window.localStorage.removeItem("refresh");
    }
};

export const useGetData = (
    endpoint,
    queryKey,
    withToken = false, // Parameter untuk menentukan apakah menggunakan token atau tidak
    params = {},
    options = {}
) => {
    return useQuery({
        queryKey,
        queryFn: async () => {
            const headers = {};

            if (withToken) {
                const token = window.localStorage.getItem("access"); // Ambil token terbaru
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.get(endpoint, {
                params: params,
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error) => {
            if (error.response && error.response.status === 401) {
                logout(); // Jika token tidak valid atau kedaluwarsa, logout
            }
        },
        ...options,
    });
};

export const usePostData = (endpoint, withToken = false) => {
    return useMutation({
        mutationFn: async (data) => {
            const headers = {
                "Content-Type": "multipart/form-data",
            };

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.post(endpoint, data, {
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error) => {
            if (error.response && error.response.status === 401) {
                logout();
            }
        },
    });
};

export const usePutData = (endpoint, withToken = false) => {
    return useMutation({
        mutationFn: async (data) => {
            const headers = {
                "Content-Type": "multipart/form-data",
            };

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.put(endpoint, data, {
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error) => {
            if (error.response && error.response.status === 401) {
                logout();
            }
        },
    });
};

export const useDeleteData = (endpoint, withToken = false) => {
    return useMutation({
        mutationFn: async (id) => {
            const headers = {};

            if (withToken) {
                const token = window.localStorage.getItem("access");
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }
            }

            const response = await axios.delete(`${endpoint}${id}/`, {
                headers: headers,
            });
            return response.data;
        },
        throwOnError: (error) => {
            if (error.response && error.response.status === 401) {
                logout();
            }
        },
    });
};

export const getData = (url, params, reducers, type) => {
    const { dispatch, redux } = reducers;
    dispatch(
        redux({
            type: type,
            payload: {
                loading: true,
                data: false,
                error: false,
            },
        })
    );

    axios({
        method: "GET",
        url: url + params,
    })
        .then((response) => {
            dispatch(
                redux({
                    type: type,
                    payload: {
                        loading: false,
                        data: response.data,
                        error: false,
                    },
                })
            );
        })
        .catch((error) => {
            dispatch(
                redux({
                    type: type,
                    payload: {
                        loading: false,
                        data: false,
                        error: error.message,
                    },
                })
            );
        });
};

// Request Post
export const postData = (url, data, reducers, type) => {
    const { dispatch, redux } = reducers;
    dispatch(
        redux({
            type: type,
            payload: {
                loading: true,
                data: false,
                error: false,
            },
        })
    );

    axios({
        method: "POST",
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("access")}`,
        },
        url: url,
        timeout: 120000,
        data: data,
    })
        .then((response) => {
            Swal.fire({
                icon: "success",
                title: "Good job!",
                customClass: {
                    container: "z-[99999]",
                },
                text: response.data.messages,
                showConfirmButton: false,
                timer: 1500,
            });
            dispatch(
                redux({
                    type: type,
                    payload: {
                        loading: false,
                        data: response.data,
                        error: false,
                    },
                })
            );
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                customClass: {
                    container: "z-[99999]",
                },
                text: error,
            });
            dispatch(
                redux({
                    type: type,
                    payload: {
                        loading: false,
                        data: false,
                        error: error.message,
                    },
                })
            );
        });
};

// Request Put
export const putData = (url, data, reducers, type) => {
    const { dispatch, redux } = reducers;
    dispatch(
        redux({
            type: type,
            payload: {
                loading: true,
                data: false,
                error: false,
            },
        })
    );

    axios({
        method: "PUT",
        headers: {
            Authorization: `Bearer ${window.localStorage.getItem("access")}`,
        },
        url: url,
        timeout: 120000,
        data: data,
    })
        .then((response) => {
            Swal.fire({
                icon: "success",
                title: "Good job!",
                customClass: {
                    container: "z-[99999]",
                },
                text: response.data.messages,
                showConfirmButton: false,
                timer: 1500,
            });
            dispatch(
                redux({
                    type: type,
                    payload: {
                        loading: false,
                        data: response.data,
                        error: false,
                    },
                })
            );
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                customClass: {
                    container: "z-[99999]",
                },
                text: error,
            });
            dispatch(
                redux({
                    type: type,
                    payload: {
                        loading: false,
                        data: false,
                        error: error.message,
                    },
                })
            );
        });
};

// Request Delete
export const deleteData = (url, reducers, type) => {
    const { dispatch, redux } = reducers;
    dispatch(
        redux({
            type: type,
            payload: {
                loading: true,
                data: false,
                error: false,
            },
        })
    );

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#378ecc",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        customClass: {
            container: "z-[99999]",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            axios({
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("access")}`,
                },
                url: url,
                timeout: 120000,
            })
                .then((response) => {
                    Swal.fire({
                        icon: "success",
                        title: "Good job!",
                        customClass: {
                            container: "z-[99999]",
                        },
                        text: response.data.messages,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    dispatch(
                        redux({
                            type: type,
                            payload: {
                                data: response.data,
                            },
                        })
                    );
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        customClass: {
                            container: "z-[99999]",
                        },
                        text: error,
                    });
                    dispatch(
                        redux({
                            type: type,
                            payload: {
                                data: false,
                            },
                        })
                    );
                });
        }
    });
};
