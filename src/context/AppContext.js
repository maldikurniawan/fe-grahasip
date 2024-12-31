import { API_URL_visitor } from "@/constants";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState(null);
    const [datauser, setDatauser] = useState({});

    const sendVisitorData = async () => {
        if (typeof window !== "undefined") {
            const userAgent = window.navigator.userAgent;
            // Dapatkan IP dari API jika diperlukan
            const ipAddress = await fetch("https://api.ipify.org?format=json")
                .then((response) => response.json())
                .then((data) => data.ip)
                .catch(() => "0.0.0.0"); // Gunakan default jika gagal mendapatkan IP
            const response = await fetch(API_URL_visitor, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ip_address: ipAddress,
                    agent: userAgent,
                }),
            });
            if (!response.ok) {
                console.error("Failed to send visitor data");
            }
        }
    };

    useEffect(() => {
        sendVisitorData();
    }, []);

    return (
        <AppContext.Provider value={{ state, setState, datauser, setDatauser }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
