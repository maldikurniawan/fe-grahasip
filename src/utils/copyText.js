import { showToast } from "./showToast";
export function copyText(text) {
  // Copy the text inside the text field
  navigator.clipboard.writeText(text);

  showToast("Teks telah disalin", "success", 1000);
}
