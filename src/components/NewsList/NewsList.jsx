import NewsItem from "../NewsItem/NewsItem";
import styles from "./NewsList.module.sass"

function NewsList({news}) {
    return (
        <ul className={styles.newsList}>
            {news.slice(1).map(item => {
                return <NewsItem key={item.id} item={item} />
            })}
        </ul>
    )
}

export default NewsList;