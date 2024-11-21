import styles from "./NewsItem.module.sass";
import { formatTimeAgo } from "../../helpers/formatTimeAgo";
import Image from "../Image/Image"

function NewsItem({item}) {
    return (
        <li className={styles.newsItem}>
            <div className={styles.newsItem__image}>
                <Image image={item.image} />
            </div>
            <div className={styles.newsItem__description}>
                <h3 className={styles.newsItem__title}>{item.title}</h3>
                <p className={styles.newsItem__info}>
                    {formatTimeAgo(item.published)} by {item.author}
                </p>
            </div> 
            
        </li>
    )
}

export default NewsItem;