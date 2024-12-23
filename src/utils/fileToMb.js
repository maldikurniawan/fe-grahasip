export const fileToMb = (sizeInBytes) => {
    // Fungsi untuk mengonversi bytes ke megabytes
    const parsedSize = parseFloat(sizeInBytes);
    if (!isNaN(parsedSize)) {
        return `${(parsedSize / 1024).toFixed(0)} kb`;
    }
    return "Invalid input";
};
