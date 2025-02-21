import { useColor } from "@/shared/lib";
import { INews } from "@/shared/types";
import { Image, Subtitle, Title } from "@/shared/ui";

import styles from "./styles.module.sass";

interface Props extends React.HTMLAttributes<HTMLLIElement> {
    news?: INews;
}

export function NewsItem({ news, ...props }: Props) {
    const color = useColor();

    return !news || Object.keys(news).length === 0 ? (
        <li className={`${styles.newsItem} ${styles.skeleton}`}>
            <div className={styles.newsItem__image}></div>
            <h3 className={styles.newsItem__title}></h3>
            <ul className={styles.newsItem__tags}></ul>
        </li>
    ) : (
        <li className={styles.newsItem} {...props}>
            <Image
                className={styles.newsItem__image}
                src={news ? news.image : "None"}
                color={color}
                isSquare={true}
            />
            <Title className={styles.newsItem__title}>{news.title}</Title>
            <ul className={styles.newsItem__tags}>
                {news.category.map((tag, index) => (
                    <Subtitle key={index}>{"#" + tag}</Subtitle>
                ))}
            </ul>
        </li>
    );
}
