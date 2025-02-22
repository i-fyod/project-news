import { useEffect, useState } from "react";

import { INews } from "@/shared/types";

export function useSavedNews() {
    const savedNews = localStorage.getItem("news");
    const parsedNews: INews[] = savedNews ? JSON.parse(savedNews) : [];

    const [news, setNews] = useState(parsedNews);

    useEffect(() => {
        localStorage.setItem("news", JSON.stringify(news));
    }, [news]);

    const addNews = (item: INews) => {
        setNews((prev) => [...prev, item]);
    };

    const removeNews = (item: INews) => {
        setNews((prevNews) => prevNews.filter((prev) => prev.id !== item.id));
    };

    const isSaved = (item: INews) => {
        return news.some((n) => n.id === item.id);
    };

    return { news, addNews, removeNews, isSaved };
}
