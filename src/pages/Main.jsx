import Header from "../components/Header/Header";
import NewsGallery from "../components/NewsGallery/NewsGallery";
import NewsList from "../components/NewsList/NewsList";
import Categories from "../components/Categories/Categories";
import Search from "../components/Search/Search";
import styles from "./Main.module.sass";
import { useEffect, useState } from "react";
import { getCategories, getNews } from "../api/apiNews";

function Main() {
    const numberVisibleNews = 30; // Макс. кол-во новостей на 1 странице
    const [news, setNews] = useState([]); // Новости из api
    const [visible, setVisible] = useState(1); // Кол-во отображаемых новостей в NewsList
    const [thisPage, setPage] = useState(2); // Текущая страница новостей
    const [loading, setLoading] = useState(false) // Состояние загрузки новостей
    const [categories, setCategories] = useState([]); // Категории, полученные от api
    const [selectedCategory, setSelectedCategory] = useState("All"); // Выбранная категория
    const [searchIsActive, setSearchActive] = useState(false) // Состояние панели поиска

    const fetchNews = async (pageNumber, category) => {
        try {
            const response = await getNews({
                param: "search",
                pageSize: numberVisibleNews,
                pageNumber: pageNumber,
                category: category
            });
            setNews(response.news);
        } catch(error) {
            console.log(error);
        }
    };

    const fetchCategories = async _ => {
        try {
            const response = await getCategories();
            setCategories(["All", ...response.categories]);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(_ => {
        const loadNews = async _ => {
            setLoading(true);
            await fetchNews(thisPage, selectedCategory);
            setLoading(false);
        };
        loadNews();
    }, [thisPage, selectedCategory])

    useEffect(_ => {
        setPage(2);
    }, [selectedCategory])

    const goToPage = pageNumber => {
        setPage(pageNumber);
        window.scrollTo({
            top: 470,
            behavior: 'smooth'
        });
    } 

    useEffect(_ => {
        fetchCategories();
    }, [])

	return ( 
		<>
			<div className="container">
				{searchIsActive ? "" : <Header />}
                <Search hideAll={setSearchActive} categories={categories}/>
			</div>
            <NewsGallery display={searchIsActive ? "none" : "block"} />
            {!searchIsActive ?
                <div className={`container ${styles.sectionForYou}`}>
                    <div className={styles.sectionForYou__header}>
                        <h2 className={styles.sectionForYou__title}>News For You</h2>
                        {news.length > 0 ? <button onClick={_ => setVisible(visible === 1 ? numberVisibleNews : 1)} className={styles.sectionForYou__more}>{visible === 1 ? "View All" : "Hide"}</button> : <div className={styles.sectionForYou__loading}></div>}
                    </div>
                    <Categories categories={categories} selected={selectedCategory} toSelect={setSelectedCategory}/>
                    <NewsList news={news} visible={visible} numberVisibleNews={numberVisibleNews} toPage={goToPage} thisPage={thisPage} loading={loading}/>
                </div> :
                ""
            }
			
		</>
		
	)
}

export default Main;
