import NewsItem from "../NewsItem/NewsItem";
import Pagination from "../Pagination/Pagination";
import styles from "./NewsList.module.sass"

function NewsList({ news, visible = 30, numberVisibleNews, toPage, thisPage, loading }) {
    return (
        <div className={styles.newsList}>
            <ul className={styles.newsList__news}>
                {news.length > 0 ?
                    news.slice(0, visible).map(item => <NewsItem key={item.id} news={item} skeleton={loading} />) :
                    <NewsItem skeleton />}
            </ul>
            {visible === numberVisibleNews && !loading ? <Pagination selected={thisPage - 1} toPage={toPage} /> : ""}
        </div>
    )
}

export default NewsList;