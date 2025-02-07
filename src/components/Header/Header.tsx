import avatar from "../../assets/icons/man_avatar.svg";
import { formatDate } from "../../helpers/formatDate";
import styles from "./Header.module.sass";

interface Props {
    size: "big" | undefined;
    title: string;
    subTitle: string;
}

const Header = ({ size, title, subTitle }: Props) => {
    return (
        <header
            className={
                size === "big" ? `${styles.header} ${styles.header__big}` : `${styles.header}`
            }>
            <div className={styles.header__avatar}>
                <img src={avatar} alt="" className={styles.header__photo} />
            </div>
            <h1 className={styles.header__title}>{title}</h1>
            <p className={styles.header__date}>{subTitle ? subTitle : formatDate(new Date())}</p>
        </header>
    );
};

export default Header;
