export const addIsAvailableProperty = (data:any) => {
    // Check if results is a valid object
    if (typeof data !== 'object' || data === null) {
        throw new Error("Invalid input: 'results' should be an object");
    }
    // Iterate over the keys of the results object and add the "isAvailable" property
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            data[key] = {
                ...data[key],
                isAvailable: true, 
                questionNumber : key 
            };
        }
    }

    return data;
}