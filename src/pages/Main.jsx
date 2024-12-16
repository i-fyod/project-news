import Header from "../components/Header/Header";
import NewsGallery from "../components/NewsGallery/NewsGallery";
import NewsList from "../components/NewsList/NewsList";
import Categories from "../components/Categories/Categories";
import Search from "../components/Search/Search";
import styles from "./Main.module.sass";
import { getCategories, getNews } from "../api/apiNews";
import { useState } from "react";
import { useFetch } from "../helpers/hooks/useFetch";

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

    const [visible, setVisible] = useState(1); // Кол-во отображаемых новостей в NewsList
    const [searchIsActive, setSearchActive] = useState(false) // Состояние панели поиска

    // Реализовать error
    const { data, isLoading} = useFetch(getNews, filters);
    const { data: dataLatest} = useFetch(getNews, {});
    const { data: dataCategories} = useFetch(getCategories);

    const goToPage = page => {
        changeFilter("pageNumber", page)
        window.scrollTo({
            top: 470,
            behavior: 'smooth'
        });
    } 

	return ( 
		<>
			<div className="container">
				{searchIsActive ? "" : <Header />}
                <Search hideAll={setSearchActive} categories={dataCategories && dataCategories.categories ? ["All", ...dataCategories.categories] : ""}/>
			</div>
            <NewsGallery news={dataLatest ? dataLatest.news : []} display={searchIsActive ? "none" : "block"} />
            {!searchIsActive ?
                <div className={`container ${styles.sectionForYou}`}>
                    <div className={styles.sectionForYou__header}>
                        <h2 className={styles.sectionForYou__title}>News For You</h2>
                        {data && data.news.length > 0 ? <button onClick={_ => setVisible(visible === 1 ? numberVisibleNews : 1)} className={styles.sectionForYou__more}>{visible === 1 ? "View All" : "Hide"}</button> : <div className={styles.sectionForYou__loading}></div>}
                    </div>
                    {dataCategories && data && data.news ? 
                    <Categories categories={["All", ...dataCategories.categories]} selected={filters.category} toSelect={name => {
                        changeFilter("category", name);
                        changeFilter("pageNumber", 2);    
                    }}/> :
                    ""}
                    {data && data.news ? 
                    <NewsList news={data.news} visible={visible} numberVisibleNews={numberVisibleNews} toPage={goToPage} thisPage={filters.pageNumber} loading={isLoading}/> : ""}
                </div> :
                ""
            }
			
		</>
		
	)
}

export default Main;
