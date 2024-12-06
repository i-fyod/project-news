import { useEffect, useState } from "react";
import NewsItem from "../NewsItem/NewsItem";
import styles from "./NewsList.module.sass"
import { getCategories, getNews } from "../../api/apiNews";
import Pagination from "../Pagination/Pagination";
import Categories from "../Categories/Categories";

function NewsList() {
    const numberVisibleNews = 30;
    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [visible, setVisible] = useState(1);
    const [thisPage, setPage] = useState(2);
    const [isLoading, setLoading] = useState(false)

    const fetchNews = async (pageSize, pageNumber, selectedCategory) => {
        try {
            setLoading(true);
            const response = await getNews({
                param: "search",
                pageSize: pageSize,
                pageNumber: pageNumber,
                category: selectedCategory === "All" ? null : selectedCategory
            });
            setNews(response.news);
            setLoading(false);
        } catch(error) {
            console.log(error);
        }
    };

    const fetchCategories = async _ => {
        try {
            const response = await getCategories();
            setCategories(["All", ...response.categories])
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(_ => {
        fetchCategories();
    }, [])

    useEffect(_ => {
        fetchNews(numberVisibleNews, thisPage, selectedCategory);
    }, [thisPage, selectedCategory])

    const goToPage = pageNumber => {
        setPage(pageNumber);
        window.scrollTo({
            top: 470,
            behavior: 'smooth'
        });
    } 

    const selectCategory = category => {
        setSelectedCategory(category);
        thisPage === 2 ? null : setPage(2);
    }

    return (
        <div className={styles.newsList}>
            <div className={styles.newsList__header}>
                <h2 className={styles.newsList__title}>News For You</h2>
                {news.length > 0 ? <button onClick={_ => setVisible(visible === 1 ? numberVisibleNews : 1)} className={styles.newsList__more}>{visible === 1 ? "View All" : "Hide"}</button> : <div className={styles.newsList__loading}></div>}
            </div>
            
            {categories.length > 0 ? 
                <Categories categories={categories} selected={selectedCategory} selectCategory={selectCategory}/> :
                <Categories skeleton />
            }
            

            <ul className={styles.newsList__news}>
                {news.length > 0 ? 
                news.slice(0, visible).map(item => <NewsItem key={item.id} news={item} skeleton={isLoading} />) :
                <NewsItem skeleton />}                
            </ul>
            {visible === numberVisibleNews ? <Pagination selected={thisPage - 1} toPage={goToPage} /> : ""}
        </div>
        
    )
}

export default NewsList;