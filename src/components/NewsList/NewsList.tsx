import { INews } from "../../interfaces";
import NewsItem from "../NewsItem/NewsItem";
import Pagination from "../Pagination/Pagination";
import styles from "./NewsList.module.sass";

interface Props {
    news: INews[];
    visible: number;
    toPage: (page: number) => void;
    thisPage: number;
    loading: boolean;
}

function NewsList({ news, visible = 30, toPage, thisPage, loading }: Props) {
    const pagination = visible === 30 || visible === 50 ? true : false;
    return (
        <div className={styles.newsList}>
            <ul className={styles.newsList__news}>
                {news.slice(0, visible).map((item) => (
                    <NewsItem news={item} skeleton={loading} />
                ))}
            </ul>
            {pagination && !loading && news.length > 0 ? (
                <Pagination selected={thisPage - 1} toPage={toPage} />
            ) : (
                ""
            )}
        </div>
    );
}

export default NewsList;
