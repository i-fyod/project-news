import { useEffect, useRef, useState } from "react";
import { getNews } from "../../api/apiNews";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import styles from "./Search.module.sass";
import Categories from "../Categories/Categories";
import NewsList from "../NewsList/NewsList";

function Search({ hideAll, categories }) {
    const [focused, setFocused] = useState(false); // Фокус на поиске
    const [keywords, setKeywords] = useState(""); // Ключевые слова из поиска
    const [news, setNews] = useState([]); // Новости из api
    const [selectedCategory, setSelectedCategory] = useState("All"); // Выбранная категория
    const [thisPage, setThisPage] = useState(2); // Текущая страница в поиске
    const [displayPagination, setPaginationDisplay] = useState(0); // Отображение пагинации
    const [loading, setLoading] = useState(false) // Состояние загрузки новостей
    const inputRef = useRef(null);
    const debouncedKeywords = useDebounce(keywords, 1000);

    const fetchNews = async ({page, category, keywords}) => {
        try {
            const response = await getNews({
                param: "search",
                pageSize: 50,
                pageNumber: page,
                category: category,
                keywords: keywords
            });
            await setNews(response.news);
            setPaginationDisplay(50);
        } catch (error) {
            console.log(error);
        }
    };

    const goToPage = pageNumber => {
        setThisPage(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } 

    useEffect(_ => {
        const loadNews = async _ => {
            setLoading(true);
            await fetchNews({
                page: thisPage,
                category: selectedCategory,
                keywords: debouncedKeywords
            });
            setLoading(false);
        };
        if (focused) {
            loadNews();
        }
    }, [thisPage])

    useEffect(_ => {
        if (thisPage === 2 && focused) {
            fetchNews({
                page: 2,
                category: selectedCategory,
                keywords: debouncedKeywords
            })
        } else {
            setThisPage(2);
        }
    }, [selectedCategory, debouncedKeywords])

    useEffect(_ => {
        if (focused) {
            inputRef.current.focus();
            hideAll(true);
        } else {
            hideAll(false);
            setKeywords("");
            setNews([]);
            setPaginationDisplay(0);
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
            <form className={styles.search} action="#">
                <button onClick={_ => {setFocused(!focused)
                } } className={styles.search__btn} type="button">
                    {focused ? icons.after : icons.before}
                </button>
                <input className={styles.search__field} type="text" placeholder="Search for article..." value={keywords} onChange={e => setKeywords(e.target.value)} ref={inputRef} onFocus={_ => setFocused(true)} />
            </form>
            {focused ?
                <div className={styles.content}>
                    <Categories categories={categories} selected={selectedCategory} toSelect={setSelectedCategory} />
                    {debouncedKeywords ? <NewsList news={news} loading={loading} toPage={goToPage} thisPage={thisPage} visible={displayPagination} numberVisibleNews={50}/> : ""}
                </div> :
                ""}

        </search>
    )
}

export default Search;