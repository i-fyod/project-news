import styles from "./NewsItem.module.sass";
import { INews } from "../../interfaces";

interface Props {
    news: INews;
    skeleton: boolean;
}

function NewsItem({news, skeleton=false}: Props) {
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
                {news.category.map((tag, index) => <li key={index} className={styles.newsItem__tag}>{"#" + tag}</li>)}
            </ul>
        </li>
    )
}

export default NewsItem;