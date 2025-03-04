import { useState } from "react";

import { Button, Title } from "@/shared/ui";

import styles from "./styles.module.sass";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    icon: React.ReactNode;
    children?: JSX.Element;
    clalazygitssName?: string;
}

export function Panel({ children, className, icon, title, ...props }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`${className ? className : ""} ${styles.panel}`}
            onClick={() => {
                setIsOpen((prev) => !prev);
            }}
            {...props}>
            <Button className={styles.panel__sidebar}>{icon}</Button>
            <Title className={styles.panel__title}>{title}</Title>
            <div
                className={
                    children && isOpen
                        ? `${styles.panel__content} ${styles.panel__content_opened}`
                        : styles.panel__content
                }>
                {children ? children : null}
            </div>
        </div>
    );
}
