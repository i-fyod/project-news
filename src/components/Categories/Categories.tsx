import styles from "./Categories.module.sass"

interface Props {
    categories: string[];
    selected: string;
    toSelect: (category: string) => void;
}

function Categories({ categories, selected, toSelect }: Props) {
    return (
        categories[0] != "All" ?
            <div className={`${styles.categories} ${styles.skeleton}`}>
                {categories.map(_ => <button className={styles.categories__item}></button>)}
            </div> :
            <div className={styles.categories}>
                {categories.map(category => <button key={category} onClick={_ => toSelect(category)} className={
                    category === selected ?
                        `${styles.categories__item} ${styles.categories__item_selected}` :
                        styles.categories__item
                }>{"#" + category}</button>)}
            </div>
    )
}

export default Categories;