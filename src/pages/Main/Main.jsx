import { useEffect, useState } from "react";
import NewsBanner from "../../components/NewsBanner/NewsBanner";
import styles from "./Main.module.sass";
import { getNews } from "../../api/apiNews";
import NewsList from "../../components/NewsList/NewsList";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";

const Main = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const pageSize = 10;

    const fetchNews = async (currentPage) => {
        try {
            setLoading(true);
            const response = await getNews(currentPage, pageSize);
            setNews(response.news);
            setLoading(false);
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(_ => {
        
        fetchNews(currentPage);
    }, [currentPage])

    const handleNextPage = _ => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handlePreviousPage = _ => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handlePage = pageNumber => {
        setCurrentPage(pageNumber);
    }

    return (
        <main className={styles.main}>
            {news.length > 0 && !loading ? 
            <>
                <NewsBanner className={styles.main__banner} item={news[0]} />
                <NewsList news={news} />
                <Pagination next={handleNextPage} previous={handlePreviousPage} toPage={handlePage} pageNumber={currentPage} totalPages={totalPages} />
            </>
            : <Loading />
            }
        </main>
    )
}

export default Main;