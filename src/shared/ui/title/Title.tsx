import styles from "./styles.module.sass";

interface Props {
    className?: string;
    children: React.ReactNode;
}

export function Title({ className, children }: Props) {
    return <h1 className={`${className ? className : ""} ${styles.title}`}>{children}</h1>;
}
