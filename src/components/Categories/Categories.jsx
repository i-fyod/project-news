import styles from "./Categories.module.sass"

function Categories({ categories, selected, toSelect }) {
    return (
        categories.length <= 0 ?
            <div className={`${styles.categories} ${styles.skeleton}`}>
                <button className={styles.categories__item}></button>
                <button className={styles.categories__item}></button>
                <button className={styles.categories__item}></button>
                <button className={styles.categories__item}></button>
                <button className={styles.categories__item}></button>
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