import axios from "axios"
const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getNews = async ({param = "latest-news", pageSize = 0, pageNumber = 1, category}) => {
    const params = {
        apiKey: API_KEY,
    }

    if (param === "search") {
        params.page_number = pageNumber;
        params.page_size = pageSize;
        params.category = category;
    }

    try {
        const response = await axios.get(BASE_URL + param, {params});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCategories = async () => {
    const params = {
        apiKey: API_KEY,
    }

    try {
        const response = await axios.get(`${BASE_URL}available/categories`, {params});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}