export const slugToText = (slug) => {
    if (!slug) return "";
    return slug
        .replace(/-/g, " ") // Ganti semua '-' dengan spasi
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Ubah huruf pertama setiap kata menjadi huruf besar
};
