import Header from "../../components/Header/Header";
import NewsGallery from "../../components/NewsGallery/NewsGallery";
import NewsList from "../../components/NewsList/NewsList";
import Categories from "../../components/Categories/Categories";
import Search from "../../components/Search/Search";
import styles from "./Main.module.sass";
import { getCategories, getLatestNews, getNews } from "../../api/apiNews";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useFetch } from "../../helpers/hooks/useFetch";
import { CategoriesApiResponse, IFilters, NewsApiResponse } from "../../interfaces";

function Main() {
    const isTablet = useMediaQuery({ query: "(width >= 1200px)" });
    const numberVisibleNews: number = 30; // Макс. кол-во новостей на 1 странице
    const [filters, setFilters] = useState<IFilters>({
        pageSize: numberVisibleNews,
        pageNumber: 2,
        category: "All"
    });

    const changeFilter = <K extends keyof IFilters>(key: K, value: IFilters[K]) => {
        setFilters(prev => {
            return {...prev, [key]: value}
        })
    }

    const [visible, setVisible] = useState(!isTablet ? 1 : 2); // Кол-во отображаемых новостей в NewsList
    const [searchIsActive, setSearchActive] = useState(false) // Состояние панели поиска

    // Реализовать error
    const { data, isLoading: isDataLoading} = useFetch<NewsApiResponse, IFilters>(getNews, filters)
    const { data: dataLatest} = useFetch<NewsApiResponse, null>(getLatestNews);
    const { data: dataCategories, isLoading: isCategoriesLoading} = useFetch<CategoriesApiResponse, null>(getCategories);
    

    const goToPage = (page: number) => {
        changeFilter("pageNumber", page)
        window.scrollTo({
            top: 470,
            behavior: 'smooth'
        });
    } 

	return ( 
		<>
			<div className={`container ${styles.header}`}>
				{searchIsActive ? "" : <Header size={undefined} subTitle="" title="Welcome back!" />}
                <Search hideAll={setSearchActive} categories={isCategoriesLoading ? new Array(45).fill("") : ["All", ...dataCategories!.categories]}/>
			</div>
            <NewsGallery news={dataLatest ? dataLatest.news : []} display={searchIsActive ? "none" : "block"} />
            {!searchIsActive ?
                <div className={`container ${styles.sectionForYou}`}>
                    <div className={styles.sectionForYou__header}>
                        <h2 className={styles.sectionForYou__title}>News For You</h2>
                        {data && data.news.length > 0 ? <button onClick={_ => setVisible((visible === 1 && !isTablet) || visible === 2 ? numberVisibleNews : (!isTablet ? 1 : 2))} className={styles.sectionForYou__more}>{(visible === 1 && !isTablet) || visible === 2 ? "View All" : "Hide"}</button> : <div className={styles.sectionForYou__loading}></div>}
                    </div>
                    <Categories categories={isCategoriesLoading ? new Array(45).fill("") : ["All", ...dataCategories!.categories]} selected={filters.category} toSelect={(name) => {
                        changeFilter("category", name);
                        changeFilter("pageNumber", 2);    
                    }}/>
                    <NewsList news={isDataLoading ? new Array(numberVisibleNews).fill({}) : data!.news} visible={visible} toPage={goToPage} thisPage={filters.pageNumber} loading={isDataLoading} />
                </div> :
                ""
            }
		</>
	)
}

export default Main;
