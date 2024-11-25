import { useEffect, useState } from "react";
import NewsBanner from "../../components/NewsBanner/NewsBanner";
import styles from "./Main.module.sass";
import { getNews } from "../../api/apiNews";
import NewsList from "../../components/NewsList/NewsList";
import Loading from "../../components/Loading/Loading";

const Main = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getNews()
                setNews(response.news)
                setLoading(false)
            } catch(error) {
                console.log(error)
            }
        };
        fetchNews();
    }, [])

    return (
        <main className={styles.main}>
            {news.length > 0 && !loading ? 
            <>
                <NewsBanner className={styles.main__banner} item={news[0]} />
                <NewsList news={news} />
            </>
            : <Loading />
            }
        </main>
    )
}

export default Main;