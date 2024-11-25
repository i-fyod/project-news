import styles from "./Pagination.module.sass"

function Pagination({totalPages, pageNumber, next, previous, toPage}) {
    const pages = [];
    for(let i = 0; i != totalPages; ++i) {
        pages.push(i)
    }

    return (
        <div className={styles.pagination}>
            <button disabled={pageNumber === 1} onClick={previous} className={styles.pagination__left}>{"<"}</button>
            {pages.map((_, i) => 
                <button 
                onClick={() => toPage(i + 1)} 
                key={i}
                disabled={i + 1 === pageNumber} 
                className={`${styles.pagination__page} ${i + 1 === pageNumber ? styles.pagination__active : ''}`}>{i + 1}
                </button>
            )}
            <button disabled={pageNumber === 10} onClick={next} className={styles.pagination__right}>{">"}</button>
        </div>
    )
}

export default Pagination;