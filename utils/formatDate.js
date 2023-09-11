export const formatDate = (date) => {
    if (!date) return "";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };