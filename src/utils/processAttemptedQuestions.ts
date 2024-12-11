export const processAttemptedQuestions = (
  newItem: any,
  localData: any,
  stringify: boolean = false // Optional flag to return string
) => {
  try {
    let array: string[] = [];

    // Ensure localData is treated as an array
    if (typeof localData === "string" && localData.trim() !== "") {
      array = localData.split(",").map((item) => item.trim()); // Split and trim
    } else if (Array.isArray(localData)) {
      array = localData.filter((item) => item && typeof item === "string"); // Filter valid strings
    }

    // Add newItem to the array, handling empty or undefined newItem
    if (Array.isArray(newItem)) {
      array.push(...newItem.filter((item) => item && typeof item === "string")); // Spread valid strings
    } else if (newItem && typeof newItem === "string") {
      array.push(newItem.trim()); // Add as a single trimmed item
    }

    // Eliminate duplicates
    array = [...new Set(array)];

    // Return the updated data, stringified if requested
    return stringify ? array.join(", ") : array;
  } catch (error) {
    console.error("Error:", error);
    return stringify ? "" : [];
  }
};
