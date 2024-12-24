import NewsItem from "../NewsItem/NewsItem";
import Pagination from "../Pagination/Pagination";
import styles from "./NewsList.module.sass"

function NewsList({ news, visible = 30, toPage, thisPage, loading }) {
    const pagination = visible === 30 || visible === 50 ? true : false
    return (
        <div className={styles.newsList}>
            <ul className={styles.newsList__news}>
                {news.slice(0, visible).map(item => <NewsItem news={item} skeleton={loading} />)}
            </ul>
            {pagination && !loading ? <Pagination selected={thisPage - 1} toPage={toPage} /> : ""}
        </div>
    )
}

export default NewsList;