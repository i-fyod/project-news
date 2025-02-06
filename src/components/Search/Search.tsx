import { useEffect, useRef, useState } from "react";
import { getNews } from "../../api/apiNews";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import styles from "./Search.module.sass";
import Categories from "../Categories/Categories";
import NewsList from "../NewsList/NewsList";
import { IFilters } from "../../interfaces";
import { useQuery } from "@tanstack/react-query";
import QueryFailed from "../QueryFailed/QueryFailed";

function Search({ hideAll }: { hideAll: (x: boolean) => void }) {
    const numberVisibleNews: number = 50; // Макс. кол-во новостей в выдаче
    const [filters, setFilters] = useState<IFilters>({
        pageSize: numberVisibleNews,
        pageNumber: 2,
        category: "All"
    });

    const changeFilter = <K extends keyof IFilters>(key: K, value: IFilters[K]) => {
        setFilters(prev => {
            return { ...prev, [key]: value }
        })
    }

    const [focused, setFocused] = useState(false); // Фокус на поиске
    const [keywords, setKeywords] = useState(""); // Ключевые слова из поиска
    const inputRef = useRef<HTMLInputElement>(null);
    const debouncedKeywords = useDebounce(keywords, 1000);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["search", filters, debouncedKeywords],
        queryFn: () => getNews({
            ...filters,
            keywords: debouncedKeywords
        }),
        select: (data) => {
            if (data.news.length === 0) {
                // Бросаем ошибку, если news пустой
                throw new Error('No news found for your search criteria.');
            }
            return data.news;
        },
        enabled: focused && !!debouncedKeywords
    })

    const news = !isLoading && data ? data : []

    const goToPage = (page: number) => {
        changeFilter("pageNumber", page);
        setTimeout(() => {
            window.scrollTo({
                top: 470,
                behavior: 'smooth'
            });
        }, 100);
    }

    useEffect(() => {
        if (!(filters.pageNumber === 2 && focused && debouncedKeywords)) changeFilter("pageNumber", 2);
    }, [filters.category, debouncedKeywords])

    useEffect(() => {
        if (focused) {
            inputRef.current!.focus();
            hideAll(true);
        } else {
            hideAll(false);
            setKeywords("");
            filters.category = "All";
        }
    }, [focused])

    const icons = {
        before: (
            <svg className={styles.search__icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_iconCarrier">
                    <path d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
            </svg>
        ),
        after: (
            <svg className={styles.search__icon} viewBox="0 0 1024 1024" fill="#ffffff" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="30">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"><path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" fill=""></path></g>
            </svg>
        )
    };

    return (
        <search className={focused ? styles.search__active : ""} role="search">
            <form className={styles.search} action="">
                <button onClick={_ => {
                    setFocused(!focused)
                }} className={styles.search__btn} type="button">
                    {focused ? icons.after : icons.before}
                </button>
                <input className={styles.search__field} type="text" placeholder="Search for article..." value={keywords} onChange={e => setKeywords(e.target.value)} ref={inputRef} onFocus={() => setFocused(true)} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        inputRef.current?.blur();
                    }
                }} />
            </form>
            {focused ?
                <div className={styles.content}>
                    <Categories selected={filters.category} toSelect={(category) => changeFilter("category", category)} />
                    {debouncedKeywords && !isError ? <NewsList news={isLoading ? new Array(numberVisibleNews).fill({}) : news} loading={isLoading} toPage={goToPage} thisPage={filters.pageNumber} visible={50} /> : isError ? <QueryFailed refetch={() => { refetch() }} /> : ""}
                </div> : ""}
        </search>
    )
}

export default Search;