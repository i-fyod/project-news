import styles from "./Categories.module.sass"

function Categories({ categories, selected, skeleton, selectCategory }) {
    return (
        skeleton ?
            <div className={`${styles.categories} ${styles.skeleton}`}>
                <button className={styles.categories__item}></button>
                <button className={styles.categories__item}></button>
                <button className={styles.categories__item}></button>
                <button className={styles.categories__item}></button>
                <button className={styles.categories__item}></button>
            </div> :
            <div className={styles.categories}>
                {categories.map(category => <button key={category} onClick={_ => selectCategory(category)} className={
                    category === selected ?
                        `${styles.categories__item} ${styles.categories__item_selected}` :
                        styles.categories__item
                }>{"#" + category}</button>)}
            </div>
    )
}

export default Categories;