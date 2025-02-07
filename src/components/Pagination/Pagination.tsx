import styles from "./Pagination.module.sass";

interface Props {
    selected: number;
    toPage: (page: number) => void;
}

function Pagination({ selected, toPage }: Props) {
    const pages = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <ul className={styles.pagination}>
            {pages.map((item) =>
                item === selected ? (
                    <li
                        className={`${styles.pagination__page} ${styles.pagination__page_selected}`}></li>
                ) : (
                    <li onClick={(_) => toPage(item + 1)} className={styles.pagination__page}></li>
                )
            )}
        </ul>
    );
}

export default Pagination;
