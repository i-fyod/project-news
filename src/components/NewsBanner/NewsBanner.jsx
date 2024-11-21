import { formatTimeAgo } from "../../helpers/formatTimeAgo";
import styles from "./NewsBanner.module.sass";
import Image from "../../components/Image/Image";

const NewsBanner = ({className, item}) => {
    return (
        <div className={`${styles.newsBanner} ${className}`}>
            <div className={styles.newsBanner__image}>
                <Image image={item.image} />
            </div>
            <h3 className={styles.newsBanner__title}>{item.title}</h3>
            <p className={styles.newsBanner__info}>
                {formatTimeAgo(item.published)} by {item.author}
            </p>
        </div>
    )
}

export default NewsBanner;