import axios from "axios"
import { CategoriesApiResponse, IFilters, NewsApiResponse } from "../interfaces";
const BASE_URL = import.meta.env.VITE_NEWS_BASE_API_URL;
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const getLatestNews = async (): Promise<NewsApiResponse> => {
    const response = await axios.get<NewsApiResponse>(BASE_URL + "latest-news", {
        params: {
            apiKey: API_KEY,
            page_size: 30,
            page_number: 1,
            category: "All",
        }
    });
    return response.data;
}

export const getNews = async (filters: IFilters | undefined): Promise<NewsApiResponse> => {
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
}

export const getCategories = async (): Promise<CategoriesApiResponse> => {
    const response = await axios.get<CategoriesApiResponse>(`${BASE_URL}available/categories`, {
        params: {
            apiKey: API_KEY
        }
    });
    return response.data;
}