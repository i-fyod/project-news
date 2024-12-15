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
    const [filters, setFilters] = useState({
        param: "search",
        pageSize: numberVisibleNews,
        pageNumber: 2,
        category: "All"
    });

    const changeFilter = (key, value) => {
        setFilters(prev => {
            return {...prev, [key]: value}
        })
    }

    const [news, setNews] = useState([]); // Новости из api
    const [visible, setVisible] = useState(1); // Кол-во отображаемых новостей в NewsList
    const [loading, setLoading] = useState(false) // Состояние загрузки новостей
    const [categories, setCategories] = useState([]); // Категории, полученные от api
    const [searchIsActive, setSearchActive] = useState(false) // Состояние панели поиска

    const fetchNews = async _ => {
        try {
            const response = await getNews(filters);
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
            await fetchNews();
            setLoading(false);
        };
        loadNews();
    }, [filters])

    const goToPage = page => {
        changeFilter("pageNumber", page)
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
                    <Categories categories={categories} selected={filters.category} toSelect={name => {
                        changeFilter("category", name);
                        changeFilter("pageNumber", 2);    
                    }}/>
                    <NewsList news={news} visible={visible} numberVisibleNews={numberVisibleNews} toPage={goToPage} thisPage={filters.pageNumber} loading={loading}/>
                </div> :
                ""
            }
			
		</>
		
	)
}

export default Main;
