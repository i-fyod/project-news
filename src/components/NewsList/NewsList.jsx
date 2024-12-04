import { useEffect, useState } from "react";
import NewsItem from "../NewsItem/NewsItem";
import styles from "./NewsList.module.sass"
import { getNews } from "../../api/apiNews";
import Pagination from "../Pagination/Pagination";

function NewsList() {
    const numberVisibleNews = 30;
    const [news, setNews] = useState([]);
    const [visible, setVisible] = useState(1);
    const [thisPage, setPage] = useState(2);
    const [isLoading, setLoading] = useState(false)

    const fetchNews = async (count, pageNumber) => {
        try {
            const response = await getNews("search", count, pageNumber);
            setNews(response.news);
            setLoading(false);
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(_ => {
        fetchNews(numberVisibleNews, thisPage);
    }, [thisPage])

    const goToPage = pageNumber => {
        setLoading(true);
        setPage(pageNumber);
        window.scrollTo({
            top: 470,
            behavior: 'smooth'
        });
    } 

    return (
        <div className={styles.newsList}>
            <div className={styles.newsList__header}>
                <h2 className={styles.newsList__title}>News For You</h2>
                {news.length > 0 ? <button onClick={_ => setVisible(visible === 1 ? numberVisibleNews : 1)} className={styles.newsList__more}>{visible === 1 ? "View All" : "Hide"}</button> : <div className={styles.newsList__loading}></div>}
            </div>
            
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