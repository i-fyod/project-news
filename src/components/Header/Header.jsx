import { formatDate } from "../../helpers/formatDate";
import styles from "./Header.module.sass"
import avatar from "../../assets/images/man_avatar.svg"

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__avatar}>
                <img src={avatar} alt="" className={styles.header__photo} />
            </div>
            <h1 className={styles.header__title}>Welcome back!</h1>
            <p className={styles.header__date}>{formatDate(new Date())}</p>
        </header>
    )
}

export default Header;