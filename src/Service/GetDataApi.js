import axios from 'axios';
const currentPageUrl = window.location.pathname;
console.log(currentPageUrl)
export const getPublicServerData = async (tableName) => {
    let results = [];
    try {
        const payload = {
            table: `${tableName}`
        };
        const response = await axios.post("https://www.political-risk.org/HHHHPUBLICAPI/getDataAll.php", payload, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        results = response?.data?.data || [];
        return results;
    } catch (error) {
        console.error('An error occurred:', error);
        return [];
    }
}


