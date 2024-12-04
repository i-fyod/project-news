import styles from "./NewsItem.module.sass";

function NewsItem({news, skeleton=false}) {
    return (
        skeleton ? 
        <li className={`${styles.newsItem} ${styles.skeleton}`}>
            <div className={styles.newsItem__image}></div>
            <h3 className={styles.newsItem__title}></h3>
            <ul className={styles.newsItem__tags}></ul>
        </li>
        :
        <li className={styles.newsItem}>
            <div className={styles.newsItem__image}>
                {news.image !== "None" ? <img src={news.image} alt="" className={styles.newsItem__photo} /> : ""}
            </div>
            <h3 className={styles.newsItem__title}>{news.title}</h3>
            <ul className={styles.newsItem__tags}>
                {news.category.map(tag => <li key={tag.id} className={styles.newsItem__tag}>{"#" + tag}</li>)}
            </ul>
        </li>
    )
}

export default NewsItem;