import axios from 'axios';
const currentPageUrl = window.location.pathname;
console.log(currentPageUrl)
export const parseJson = async (jsonString) => {
    if (jsonString && jsonString.trim() !== "") {
        try {
            // Check if the value is a Promise, and resolve it
            if (jsonString instanceof Promise) {
                jsonString = await jsonString; // Wait for the Promise to resolve
            }

            // Now parse the resolved value (it should be a string)
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return []; // Return an empty array if JSON is invalid or an error occurs
        }
    } else {
        console.log('Invalid or empty JSON string');
        return [];  // Return empty array if string is empty or null
    }
}


