export const createSlug = (text) => {
    if (text) {
      return text
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .trim() // Trim whitespace from both ends
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/--+/g, "-"); // Replace multiple hyphens with a single hyphen
    } else {
      return null;
    }
  };
  