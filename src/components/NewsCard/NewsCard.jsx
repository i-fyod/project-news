import styles from "./NewsCard.module.sass"

function NewsCard() {
    return (
        <div className={styles.card}>
            <div className={styles.card__image}>
                {/* <img src="" alt="" className={styles.card__photo} /> */}
            </div>
            <h2 className={styles.card__title}>Feel the thrill on the only
            surf simulator in Maldives 2022</h2>
            <div className={styles.card__avatar}>
                {/* <img src="" alt="" className={styles.card__photo} /> */}
            </div>
            <div className={styles.card__about}>
                <h3 className={styles.card__author}>Sang Dong-Min</h3>
                <p className={styles.card__time}>Sep 9, 2022</p>
            </div>
        </div>
    )
}

export default NewsCard;