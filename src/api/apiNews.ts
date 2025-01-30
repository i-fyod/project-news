import axios from "axios"
import { CategoriesApiResponse, IFilters, NewsApiResponse, Status } from "../interfaces";
const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getLatestNews = async (): Promise<NewsApiResponse> => {
    try {
        const response = await axios.get<NewsApiResponse>(BASE_URL + "latest-news", {
            params: {
                apiKey: API_KEY,
                page_size: 30,
                page_number: 1,
                category: "All",
            }
        });
        return response.data;
    } catch(error) {
        console.log(error);
        return { news: [], page: 1, status: Status.Error}
    }
}

export const getNews = async (filters: IFilters | undefined): Promise<NewsApiResponse> => {
    try {
        const response = await axios.get<NewsApiResponse>(BASE_URL + "search", {
            params: {
                apiKey: API_KEY,
                page_size: filters?.pageSize || 30, 
                page_number: filters?.pageNumber || 2,
                category: filters?.category || "All",
                keywords: filters?.keywords || ""
            }
        });
        return response.data;
    } catch(error) {
        console.log(error);
        return { news: [], page: 1, status: Status.Error}
    }
}

export const getCategories = async (): Promise<CategoriesApiResponse> => {
    const params = {
        apiKey: API_KEY,
    }

    try {
        const response = await axios.get<CategoriesApiResponse>(`${BASE_URL}available/categories`, {params});
        return response.data;
    } catch (error) {
        console.log(error);
        return { categories: [], description: "Failed", status: Status.Error};
    }
}