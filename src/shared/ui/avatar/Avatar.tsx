import avatar from "@/shared/assets/icons/man_avatar.svg";

import styles from "./styles.module.sass";

interface Props {
    className?: string;
    isBig?: boolean;
}

export function Avatar({ className, isBig }: Props) {
    return (
        <div
            className={
                isBig
                    ? `${className ? className : ""} ${styles.avatarContainer} ${styles.bigContainer}`
                    : `${className ? className : ""} ${styles.avatarContainer}`
            }>
            <img src={avatar} alt="" className={styles.avatar} />
        </div>
    );
}
