export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

export const getMonth = (dateInput) => {
  // Check if `dateInput` is null, undefined or a unvalidate value 
  if (!dateInput) return "Date invalide";

  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  // Check if the conversion date failed
  if (Number.isNaN(date.getTime())) return "Date invalide";

  return MONTHS[date.getMonth() + 1]; // Return the right month
};





