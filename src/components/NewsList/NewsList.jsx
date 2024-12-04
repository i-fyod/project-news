import { useEffect, useState } from "react";
import NewsItem from "../NewsItem/NewsItem";
import styles from "./NewsList.module.sass"
import { getNews } from "../../api/apiNews";

function NewsList() {
    const numberVisibleNews = 15;
    const [news, setNews] = useState([]);
    const [visible, setVisible] = useState(1);

    const fetchNews = async (count) => {
        try {
            const response = await getNews("search", count);
            setNews(response.news)
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(_ => {fetchNews(numberVisibleNews)}, [])

    return (
        <div className={styles.newsList}>
            <div className={styles.newsList__header}>
                <h2 className={styles.newsList__title}>News For You</h2>
                {news.length > 0 ? <button onClick={_ => setVisible(visible === 1 ? numberVisibleNews : 1)} className={styles.newsList__more}>{visible === 1 ? "View All" : "Hide"}</button> : <div className={styles.newsList__loading}></div>}
            </div>
            
            <ul className={styles.newsList__news}>
                {news.length > 0 ? 
                news.slice(0, visible).map(item => <NewsItem key={item.id} news={item} />) :
                <NewsItem skeleton />}                
            </ul>
        </div>
        
    )
}

export default NewsList;