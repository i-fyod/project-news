import styles from "./NewsCard.module.sass"
import {formatTimeAgo} from "../../helpers/formatTimeAgo"

function NewsCard({news}) {
    return (
        <div className={styles.card}>
            <div className={styles.card__image}>
                <img src={news.image} alt="" className={styles.card__photo} />
            </div>
            <h2 className={styles.card__title}>{news.title}</h2>
            <div className={styles.card__avatar}>
                {/* <img src="" alt="" className={styles.card__photo} /> */}
            </div>
            <div className={styles.card__about}>
                <h3 className={styles.card__author}>{news.author}</h3>
                <p className={styles.card__time}>{formatTimeAgo(news.published)}</p>
            </div>
        </div>
    )
}

export default NewsCard;