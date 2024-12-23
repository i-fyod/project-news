import styles from "./NewsCard.module.sass"
import {formatTimeAgo} from "../../helpers/formatTimeAgo"
import { CARDCOUNT } from "../../constants/constants";
import avatar from "../../assets/icons/avatar.svg"

function NewsCard({news, skeleton=false}) {
    return (
            skeleton ? 
            Array.from({length: CARDCOUNT}).map(_ => <>
                <div className={`${styles.card} ${styles.skeleton}`}>
                    <div className={styles.card__image}></div>
                    <h3 className={styles.card__title}></h3>
                    <div className={styles.card__avatar}></div>
                    <div className={styles.card__about}>
                        <h4 className={styles.card__author}></h4>
                        <p className={styles.card__time}></p>
                    </div>
                </div>
            </>)
            :
            <div className={styles.card}>
                <div className={styles.card__image}>
                    {news.image !== "None" ? <img src={news.image} alt="" className={styles.card__photo} /> : ""}
                </div>
                <h3 className={styles.card__title}>{news.title}</h3>
                <div className={styles.card__avatar}>
                    <img src={avatar} alt="" className={styles.card__photo} />
                </div>
                <div className={styles.card__about}>
                    <h4 className={styles.card__author}>{news.author ? news.author : "Unknown author"}</h4>
                    <p className={styles.card__time}>{formatTimeAgo(news.published)}</p>
                </div>
            </div>          
    )
}

export default NewsCard;