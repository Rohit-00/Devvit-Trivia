export const processAttemptedQuestions = (newItem: any, localData: any) => {
    try {
      let array;
  
      // Step 1: Check if `localData` is a single string
      if (typeof localData === "string") {
        array = [localData]; // Convert the string into an array
      } else {
        array = localData; // If it's already an array, use it directly
      }
  
      // Step 2: Add the new item to the array
      array.push(newItem);
  
      // Step 3: Eliminate duplicates using a Set
      array = [...new Set(array)];
  
      // Step 4: Update the local data by converting the array back to a string
      localData = array.join(", "); // Join the array into a string with commas
  
      // Step 5: Optionally, convert back to an array for verification
      let updatedArray = localData.split(", "); // Split the string back into an array
      return updatedArray;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  