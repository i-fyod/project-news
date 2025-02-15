import { Avatar, Subtitle, Title } from "@/shared/ui";

import styles from "./styles.module.sass";

interface Props {
    bigAvatar?: boolean;
    title: string;
    subtitle: string;
    hidden?: boolean;
}

export function UserInfo({ bigAvatar, title, subtitle, hidden }: Props) {
    return (
        <div style={hidden ? {visibility: "hidden"} : {}} className={bigAvatar ? `${styles.bigAvatar} ${styles.userInfo}` : styles.userInfo}>
            <Avatar className={styles.userInfo__avatar} isBig={bigAvatar} />
            <Title className={styles.userInfo__title}>{title}</Title>
            <Subtitle className={styles.userInfo__subtitle}>{subtitle}</Subtitle>
        </div>
    );
}
