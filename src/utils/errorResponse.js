import Swal from "sweetalert2";
import { showToast } from "./showToast";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export const errorResponse = (error) => {
    if (error.request.status === 401) {
        showToast(
            "The user session has expired, please log in again. 3 seconds for redirection..."
        );

        setTimeout(() => {
            window.location.href = "/auth-system/login";
        }, 3000);
        return;
    }

    if (error.response.data && error.response.status !== 500) {
        // Jika respons mengandung data objek, tampilkan sebagai daftar
        MySwal.fire({
            icon: "error",
            title: "Oops sorry...",
            customClass: {
                container: "z-[99999999999]",
            },
            html: `
          <div>
            <ul>
              ${(() => {
                    const entries = Object.entries(error.response.data);
                    return entries
                        .map(([key, value]) => {
                            return `<li><strong>${key}</strong>: ${value}</li>`;
                        })
                        .join("");
                })()}
            </ul>
          </div>
        `,
        });
    } else {
        // Jika respons tidak mengandung data objek, tampilkan pesan error langsung
        MySwal.fire({
            icon: "error",
            title: "Oops sorry...",
            text: error.message,
            customClass: {
                container: "z-[99999999999]",
            },
        });
    }
};
