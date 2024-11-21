import { formatDate } from "../../helpers/formatDate";
import styles from "./Header.module.sass"
const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__title}>Good morning</h1>
            <p className={styles.header__date}>{formatDate(new Date())}</p>
        </header>
    )
}

export default Header;